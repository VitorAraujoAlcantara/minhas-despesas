import { useEffect, useState } from "react";
import { Navigate, useParams } from "react-router-dom";
import styled from "styled-components";
import Box, { BoxBottom } from "../../components/box";
import CrudAdd from "../../components/forms/crud-add";
import FormHeader from "../../components/forms/form-header";
import LabelBold from "../../components/labels/label-bold";
import { DespesaCreateDto } from "../../models/despesa-create-dto";
import { GrupoDespesaCreateDto } from "../../models/grupo-despesa-create-dto";
import { GrupoDespesaDto } from "../../models/grupo-despesa-dto";
import DivPeriodoSummary from "../../specific-components/periodo/div-periodo-summary";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { despesaCrudSlice } from "../../store/reducers/despesa";
import { grupoDespesaCrudSlice } from "../../store/reducers/grupo-despesa";
import { periodoCrudSlice } from "../../store/reducers/periodo";
import { FormAddComboboxConfig, FormAddItemConfig, FormAddItemErroConfig, FormAddItemHidedConfig } from "../../types/form-add-item-config";
import { ListItem } from "../../types/list-item";

const DivRoot = styled(Box)`
    flex: 1;
    display: flex;    
    flex-direction: column;
`

const DivSubTitle = styled(BoxBottom)`
    display: flex;
    
    gap: 10px;
    padding: 10px;
`


const ConfigForm: Array<FormAddItemConfig<DespesaCreateDto> | FormAddItemHidedConfig<DespesaCreateDto> | FormAddItemErroConfig | FormAddComboboxConfig> = [
    {
        fieldName: 'descricao',
        fieldCaption: 'Descrição',
        inputType: 'text',
        autoFocus: true,
        required: true
    },
    {
        comboCaption: 'Grupo',
        fieldName: 'grupoDespesaId',
        listName: 'grupoDespesas',
        comboEmptyValue: {
            key: '', value: 'Selecione um grupo'
        }
    },
    {
        fieldName: 'valor',
        fieldCaption: 'Valor',
        inputType: 'number',        
        required: true
    },
]

const FrmDespesaAdd = () => {
    const { id } = useParams();

    const dispach = useAppDispatch();
    const { entity } = useAppSelector(state => state.periodo);
    const { data } = useAppSelector(state => state.grupoDespesa);
    const { contaId } = useAppSelector(state => state.app);
    const { created } = useAppSelector(state => state.despesa )
    const [despesa, setDespesa] = useState<DespesaCreateDto>({
        descricao: '',
        grupoDespesaId: '',
        periodoId: id ?? '',
        valor: 0.00
    })
    const [started, setStarted] = useState<boolean>(false);
    const [cancel, setCancel] = useState<boolean>(false);
    const [grupoDespesas, setGrupoDespesas] = useState<Array<GrupoDespesaDto>>([]);

    useEffect(() => {
        dispach(periodoCrudSlice.getEntityById(id ?? ''))
        dispach(grupoDespesaCrudSlice.getItemsByFilter({
            itensPerPage: 1000,
            order: 'Nome',
            page: 1,
            filter: {
                contaId
            }

        }))
        dispach(despesaCrudSlice.clearData());
        setStarted(true);
    }, [])


    useEffect(() => {
        if (!data) {
            return;
        }

        setGrupoDespesas(data.itens);
    }, [data])


    if (cancel || ( created && started )) {
        return (<Navigate to='/expense' />)
    }

    let listItens: { [key: string]: Array<ListItem> } = {};
    const listGrupos: Array<ListItem> = grupoDespesas.map(item => ({
        key: item.grupoDespesaId,
        value: item.nome
    })) as Array<ListItem>;
    listItens.grupoDespesas = listGrupos;

    const handleOnFormSubmit = () => {
        dispach(despesaCrudSlice.create(despesa));
    }

    return (
        <DivRoot>
            <FormHeader>NOVO LANÇAMENTO</FormHeader>
            <DivSubTitle>
                <LabelBold>PERÍODO:</LabelBold>
                {`${entity ? entity.ano : ''}/${entity ? entity.mes : ''}`}
            </DivSubTitle>
            <DivPeriodoSummary
                entity={entity}
            />
            <CrudAdd<DespesaCreateDto>
                formConfigs={ConfigForm}
                itemTemplate={despesa}
                title='CADASTRO DE DESPESA'
                onUpdateTemplate={v => setDespesa({ ...v })}
                onSubmit={handleOnFormSubmit}
                onCancel={() => setCancel(true)}
                listItens={listItens}
            />

        </DivRoot>
    )
}

export default FrmDespesaAdd