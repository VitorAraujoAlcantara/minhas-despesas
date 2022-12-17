import { useEffect, useState } from "react";
import styled from "styled-components";
import Box, { BoxBottom } from "../../components/box";
import BtnIcon from "../../components/buttons/btn-icon";
import FormHeader from "../../components/forms/form-header";
import ModalPanelDefault from "../../components/modals/modal-panel-default";
import PageControl from "../../components/page-control";
import TableDefault from "../../components/tables/table-default";
import { DespesaDto } from "../../models/despesa-dto";
import { PaginatedFilterDataQuery } from "../../models/paginated-filter-data-query";
import { PeriodoFilterDto } from "../../models/periodo-filter-dto";
import DivDelete from "../../specific-components/despesa/div-delete";
import DivPayment from "../../specific-components/despesa/div-payment";
import ClonePeriodo from "../../specific-components/periodo/clone-periodo";
import DivPeriodoSummary from "../../specific-components/periodo/div-periodo-summary";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { periodoCrudSlice } from "../../store/reducers/periodo";
import { PageControlTabConfig } from "../../types/page-control-tab-config";
import { TableItemConfig } from "../../types/table-item-config";

const DivRoot = styled(Box)`
    flex: 1;
    display: flex;
    flex-direction: column;
    overflow: auto;
`

const DivToolBar = styled(BoxBottom)`
    display: flex;
    padding: 0px 10px;
`

const DivPageControl = styled.div`
    display: flex;
    flex: 1;
    overflow: auto;
`

const TableContainer = styled(BoxBottom)`
    display: flex;
    flex: 1;
    overflow: auto;
`

const configTable: Array<TableItemConfig<DespesaDto>> = [
    {
        fieldCaption: 'Descrição',
        fieldName: 'descricao',
        renderValue: 'descricao',
        alignment: 'left'
    },
    {
        fieldCaption: 'Data cad.',
        fieldName: 'dataCadastro',
        renderValue: (c) => new Date(c.dataCadastro).toLocaleString('PT-BR'),
        alignment: 'left'
    },
    {
        fieldCaption: 'Valor',
        fieldName: 'valor',
        renderValue: (c) => c.valor.toLocaleString('PT-BR', { style: 'currency', currency: 'BRL' }),
        alignment: 'right'
    },
    {
        fieldCaption: 'Pago',
        fieldName: 'valorPago',
        renderValue: (c) => c.valorPago.toLocaleString('PT-BR', { style: 'currency', currency: 'BRL' }),
        alignment: 'right'
    },
    {
        fieldCaption: 'Falta',
        fieldName: 'valorFalta',
        renderValue: (c) => c.valorFalta.toLocaleString('PT-BR', { style: 'currency', currency: 'BRL' }),
        alignment: 'right'
    },

]

const ActionDiv = styled.div`
    display: flex;
    gap: 10px;
`

const FrmDespesa = () => {
    const dispach = useAppDispatch();
    const { data, entity, deleted } = useAppSelector(state => state.periodo)
    const [filter, setFilter] = useState<PaginatedFilterDataQuery<PeriodoFilterDto>>({
        filter: {},
        itensPerPage: 10,
        order: 'Ano_desc;Mes_desc',
        page: 1
    })
    const [itemToPay, setItemToPay] = useState<DespesaDto | undefined>();
    const [showPayment, setShowPayment] = useState<boolean>(false);

    const [itemToDelete, setItemToDelete] = useState<DespesaDto | undefined>();
    const [showDelete, setShowDelete] = useState<boolean>(false);

    const [showClonePeriodo, setShowClonePeriodo] = useState<boolean>(false);

    useEffect(() => {
        dispach(periodoCrudSlice.clearData())
    }, [])

    useEffect(() => {
        if (!filter) {
            return;
        }

        dispach(periodoCrudSlice.getItemsByFilter(filter))

    }, [filter])

    useEffect(() => {
        if (!data) {
            return;
        }

        if (!data.itens || !data.itens.length) {
            return;
        }

        if (!entity) {
            dispach(periodoCrudSlice.getEntityById(data.itens[0].periodoId))
        }

    }, [data])

    useEffect(() => {
        if (!deleted) {
            return;
        }

        dispach(periodoCrudSlice.clearData());
        setFilter({ ...filter });


    }, [deleted])

    useEffect(() => {
        if (!itemToPay) {
            return;
        }

        setShowPayment(true);

    }, [itemToPay])

    useEffect(() => {
        if (!itemToDelete) {
            return;
        }

        setShowDelete(true);

    }, [itemToDelete])

    const tabConf = data?.itens.map(value => (
        {
            caption: `${value.ano}/${value.mes}`,
            key: value.periodoId,
            active: entity && entity.ano === value.ano && entity.mes === value.mes,
            to: `/expense/${entity?.periodoId}`
        } as PageControlTabConfig
    )) ?? []
    const tabs: Array<PageControlTabConfig> = tabConf;

    const handleTableClick = (key: string) => {
        dispach(periodoCrudSlice.getEntityById(key))
    }

    const handleTableNextClick = () => {
        if (!filter) {
            return;
        }
        dispach(periodoCrudSlice.clearData())
        setFilter({ ...filter, page: filter.page + 1 })
    }

    const handleTablePriorClick = () => {
        if (!filter) {
            return;
        }
        dispach(periodoCrudSlice.clearData())
        setFilter({ ...filter, page: filter.page - 1 })
    }

    const handleRemPeriodoClick = () => {
        if (!entity) {
            return;
        }
        dispach(periodoCrudSlice.deleteEntityById(entity?.periodoId))
    }

    const RenderTableAction = (item: DespesaDto): React.ReactNode => {
        return (
            <ActionDiv>
                {item.valorFalta > 0 &&
                    <BtnIcon
                        icon="coins"
                        caption="Pagar"
                        size="small"
                        onClick={() => {
                            setItemToPay(item);
                        }}
                    />
                }
                {/* {item.valorPago > 0 &&
                    <BtnIcon
                        icon="coins"
                        caption="Remover pag."
                        size="small"
                    />
                } */}
                {item.valorPago === 0 &&
                    <BtnIcon
                        icon="minus"
                        caption="Excluir"
                        size="small"
                        onClick={() => {
                            setItemToDelete(item);
                        }}
                    />
                }
            </ActionDiv>
        )
    }

    return (
        <DivRoot>
            <FormHeader>
                DESPESAS
            </FormHeader>
            <DivToolBar>
                <BtnIcon
                    icon="plus"
                    caption="Abrir período"
                    size="normal"
                    to="period/add"
                />
            </DivToolBar>
            <DivPageControl>
                <PageControl
                    tabs={tabs}
                    showPrior={data ? data?.pageInfo.currentPage > 1 : false}
                    showNext={data ? data?.pageInfo.currentPage < data?.pageInfo.pageCount : false}
                    onTabClick={handleTableClick}
                    onTabNextClick={handleTableNextClick}
                    onTabPriorClick={handleTablePriorClick}
                >
                    <DivToolBar>

                        <BtnIcon
                            icon="trash"
                            caption="Rem. período"
                            size="small"
                            onClick={handleRemPeriodoClick}
                            disabled={!entity || entity.valor.toFixed(2) !==  parseFloat('0').toFixed(2) }
                        />


                        <BtnIcon
                            icon="moneyCheckDollar"
                            caption="Novo lançamento"
                            size="small"
                            to={entity ? `${entity.periodoId}/add` : ''}
                            disabled={!entity}
                        />

                        <BtnIcon
                            icon="copy"
                            caption="Copiar período"
                            size="small"
                            onClick={() => setShowClonePeriodo(true)}
                            disabled={!entity || entity.valor.toFixed(2) ===  parseFloat('0').toFixed(2) }
                        />

                    </DivToolBar>
                    <TableContainer>
                        <TableDefault<DespesaDto>
                            tableItemConfigs={configTable}
                            itens={entity ? entity.despesas : []}
                            renderActionCell={RenderTableAction}
                        />
                    </TableContainer>
                    <DivPeriodoSummary
                        entity={entity}
                    />

                </PageControl>
            </DivPageControl>

            <ModalPanelDefault
                show={showPayment}
                onHide={() => setItemToPay(undefined)}
            >
                <DivPayment
                    itemToPay={itemToPay}
                    onCancel={() => setShowPayment(false)}
                    onPayment={() => {
                        setFilter({ ...filter })
                        dispach(periodoCrudSlice.getEntityById(entity ? entity?.periodoId : ''))
                        setShowPayment(false)
                    }
                    }
                />

            </ModalPanelDefault>

            <ModalPanelDefault
                show={showDelete}
                onHide={() => setItemToDelete(undefined)}
            >
                <DivDelete
                    entity={itemToDelete}
                    onCancel={() => setShowDelete(false)}
                    onDelete={() => {
                        dispach(periodoCrudSlice.getEntityById(entity ? entity?.periodoId : ''))
                        setShowDelete(false)
                    }}
                />

            </ModalPanelDefault>

            <ModalPanelDefault
                show={showClonePeriodo}
                onHide={() => setShowClonePeriodo(false)}
            >
                <ClonePeriodo
                    entity={entity}
                    onCancel={() => setShowClonePeriodo(false)}
                />

            </ModalPanelDefault>

        </DivRoot>
    )
}

export default FrmDespesa