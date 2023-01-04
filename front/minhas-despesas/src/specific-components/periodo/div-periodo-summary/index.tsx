import styled from "styled-components";
import { BoxBottom } from "../../../components/box";
import LabelBold from "../../../components/labels/label-bold";
import { PeriodoDto } from "../../../models/periodo-dto";

const DivRoot = styled(BoxBottom)`
    display: flex;
    padding: 10px;
    gap: 10px;
    flex-wrap: wrap;
    background-color: ${props => props.theme.palette.secondary.main};
    color: ${props => props.theme.palette.secondary.contrastText};

`
const DivSummaryItem = styled.div`
    display: flex;
    gap: 10px;
    flex: 1;
    justify-content: center;
`

const SummaryLabel = styled(LabelBold)`
    white-space: nowrap;
`

interface SummaryValueProps {
    caption: string;
    value: string | number;
}

const SummaryValue = (props: SummaryValueProps) => {
    return (
        <DivSummaryItem>
            <SummaryLabel> {props.caption} </SummaryLabel>
            {props.value}
        </DivSummaryItem>
    )
}


interface DivPeriodoSummaryProp {
    entity?: PeriodoDto
}

const DivPeriodoSummary = (props: DivPeriodoSummaryProp) => {
    const { entity } = props;
    return (
        <DivRoot>


            <SummaryValue
                caption='Valor total:'
                value={(!entity ? 0.0 : entity.valor).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
            />


            <SummaryValue
                caption='Valor pago:'
                value={(!entity ? 0.0 : entity.valorPago).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
            />

            <SummaryValue
                caption='Valor falta:'
                value={(!entity ? 0.0 : entity.valorFalta).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
            />


        </DivRoot>
    )
}

export default DivPeriodoSummary