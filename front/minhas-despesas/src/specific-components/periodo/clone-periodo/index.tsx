import styled from "styled-components";
import { BoxBottom } from "../../../components/box";
import BtnSubmit from "../../../components/buttons/btn-submit";
import FormHeader from "../../../components/forms/form-header";
import { PeriodoDto } from "../../../models/periodo-dto";

const DivRoot = styled.div`
    flex: 1;
    display: flex;
    flex-direction:  column;
`

const DivBody = styled.div`
    display: flex;
    flex: 1;
    flex-direction: column;
    padding: 10px;
`

const FormFooter = styled.div`
    display: flex;
    gap: 10px;
    button{
        flex: 1;
    }
`



interface ClonePeriodoProps {
    entity?: PeriodoDto;
    onCancel: () => void;
}

const ClonePeriodo = (props: ClonePeriodoProps) => {
    const { entity } = props;
    // const novaData = new Date(entity?.ano, entity?.mes, 1)
    return (
        <DivRoot>
            <BoxBottom>
                <FormHeader>
                    CLONAR PERÍODO
                </FormHeader>
            </BoxBottom>
            <DivBody>
                <p>
                    Deseja criar uma cópia do período selecionado?
                </p>
                <p>
                    <small>
                        <i>Isso fará uma cópia das despesas lançadas</i>
                    </small>
                </p>
            </DivBody>

            <FormFooter>
                <BtnSubmit
                    caption="SIM"
                />
                <BtnSubmit
                    caption="NÃO"
                    onClick={() => props.onCancel()}
                />
            </FormFooter>
        </DivRoot>
    )
}

export default ClonePeriodo