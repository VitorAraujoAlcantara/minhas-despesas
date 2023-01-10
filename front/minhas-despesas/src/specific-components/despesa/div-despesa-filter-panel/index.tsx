import { useEffect, useState } from "react";
import styled, { keyframes } from "styled-components";
import Button from "../../../components/buttons/button";
import { GroupBox } from "../../../components/group-box";
import Hr from "../../../components/hr";
import InputCombobobx from "../../../components/inputs/input-combobox";
import InputText from "../../../components/inputs/input-text";
import LabelBold from "../../../components/labels/label-bold";
import { DespesaFilterDto } from "../../../models/despesa-filter-dto";
import { GrupoDespesaDto } from "../../../models/grupo-despesa-dto";
import { ListItem } from "../../../types/list-item";

const flip = keyframes`
    from {
        opacity: 0;
        transform: scale(0.1);
    }
    to{
        opacity: 1;
        transform: scale(1);
    }
`

const DivRoot = styled.div`
    display: flex;    
    transition: 0.2s;
    animation: ${flip} 0.2s linear;
    flex-direction: column;  
    overflow  : scroll ;
    font-size: 0.8rem;
`

const DivRow = styled.div`
    display: flex;
    padding: 0px 10px;    
    flex-wrap: wrap;
`

const DivGroupBox = styled(GroupBox)`
    flex: 1;
`

interface DivDespesaFilterPanelProps {
    show: boolean;
    grupos: Array<GrupoDespesaDto>;
    filter: DespesaFilterDto;
    onFilter: (filter: DespesaFilterDto) => void
}
const DivDespesaFilterPanel = (props: DivDespesaFilterPanelProps) => {
    const [visible, setVisible] = useState<boolean>(false);
    const [despesaFilter, setDespesaFilter] = useState<DespesaFilterDto>({
        periodoId: ''
    });

    useEffect(() => {
        if (!props.filter) {
            return;
        }

        setDespesaFilter(props.filter);
    }, [props.filter])

    useEffect(() => {
        if (!props.show && visible) {
            setTimeout(() => {
                setVisible(false);
            }, 500)
            return;
        }


        if (!props.show) {
            return;
        }

        setDespesaFilter(props.filter)
        setVisible(true);

    }, [props.show])

    if (!visible) {
        return null;
    }

    const style: React.CSSProperties = {

    }

    if (!props.show) {
        style.transform = 'scale(0.1)';
        style.opacity = 0.1;
    }

    return (
        <DivRoot
            style={style}
        >
            <DivRow>
                <InputText
                    caption="Descrição:"
                    inputType="text"
                    onChangeValue={v => setDespesaFilter({ ...despesaFilter, descricao: v })}
                    value={despesaFilter.descricao}
                />
                <InputText
                    caption="Valor:"
                    inputType="number"
                    onChangeValue={v => setDespesaFilter({ ...despesaFilter, valor: parseFloat(v) })}
                    value={despesaFilter.valor?.toString()}
                />
                <InputText
                    caption="Valor pago:"
                    inputType="number"
                    onChangeValue={v => setDespesaFilter({ ...despesaFilter, valorPago: parseFloat(v) })}
                    value={despesaFilter.valorPago?.toString()}
                />

                <InputText
                    caption="Valor falta:"
                    inputType="number"
                    onChangeValue={v => setDespesaFilter({ ...despesaFilter, valorFalta: parseFloat(v) })}
                    value={despesaFilter.valorFalta?.toString()}
                />
            </DivRow>
            <DivRow>
                <InputCombobobx
                    caption="Grupo"
                    list={
                        props.grupos.map(grupo => ({
                            key: grupo.grupoDespesaId,
                            value: grupo.nome
                        } as ListItem))
                    }
                    onChange={v => setDespesaFilter({ ...despesaFilter, grupoDespesaId: v })}
                    value={despesaFilter.grupoDespesaId ?? ''}
                    emptyValue={{
                        key: '',
                        value: 'Todos'
                    }}
                />
            </DivRow>
            <DivRow>
                <DivGroupBox>
                    <legend>
                        Tipo de lançamento:
                    </legend>
                    <LabelBold>
                        Todos:
                        <input type='radio'
                            onChange={
                                e => {
                                    if (e.target.checked) {
                                        setDespesaFilter({
                                            ...despesaFilter,
                                            apenasPagos: undefined,
                                            apenasPendentes: undefined
                                        })
                                    }
                                }}
                            checked={!despesaFilter.apenasPagos && !despesaFilter.apenasPendentes} />
                    </LabelBold>
                    <LabelBold>
                        Apenas pagos:
                        <input type='radio'
                            onChange={
                                e => {
                                    if (e.target.checked) {
                                        setDespesaFilter({
                                            ...despesaFilter,
                                            apenasPagos: true,
                                            apenasPendentes: undefined
                                        })
                                    }
                                }}
                            checked={despesaFilter.apenasPagos} />
                    </LabelBold>

                    <LabelBold>
                        Apenas pendentes:
                        <input type='radio'
                            onChange={
                                e => {
                                    if (e.target.checked) {
                                        setDespesaFilter({
                                            ...despesaFilter,
                                            apenasPagos: undefined,
                                            apenasPendentes: true
                                        })
                                    }
                                }}
                            checked={despesaFilter.apenasPendentes} />
                    </LabelBold>
                </DivGroupBox>
            </DivRow>
            <Hr />
            <DivRow>

                <Button
                    onClick={() => props.onFilter(despesaFilter)}
                >
                    Filtrar
                </Button>
            </DivRow>

        </DivRoot>
    )
}

export default DivDespesaFilterPanel;