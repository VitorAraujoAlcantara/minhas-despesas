import styled from "styled-components";
import Box, { BoxBottom } from "../../../components/box";
import FormHeader from "../../../components/forms/form-header";
import LabelBold from "../../../components/labels/label-bold";
import { DespesaDto } from "../../../models/despesa-dto";

const DivRoot = styled(Box)`
    flex:1;
    display: flex;    
    flex-direction: column;
`

const DivRow = styled(BoxBottom)`
    display: flex;
    gap: 10px;
    padding: 10px;
`

interface DivDespesaDetailProps {
    entity?: DespesaDto
}

const DivDespesaDetail = (props: DivDespesaDetailProps) => {
    return(
        <DivRoot>
            <FormHeader>Detalhe</FormHeader>
            <DivRow>
                <LabelBold>Descrição:</LabelBold>
                {props.entity?.descricao}
            </DivRow>

            <DivRow>
                <LabelBold>Data cadastro:</LabelBold>
                {new Date(props.entity?.dataCadastro as Date).toLocaleString()}
            </DivRow>

            <DivRow>
                <LabelBold>Grupo:</LabelBold>
                {props.entity?.grupoDespesa?.nome}
            </DivRow>

            <DivRow>
                <LabelBold>Valor:</LabelBold>
                {props.entity?.valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL'})}
            </DivRow>

            <DivRow>
                <LabelBold>Pago:</LabelBold>
                {props.entity?.valorPago.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL'})}
            </DivRow>

            <DivRow>
                <LabelBold>Falta:</LabelBold>
                {props.entity?.valorFalta.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL'})}
            </DivRow>
        </DivRoot>
    )
}

export default DivDespesaDetail