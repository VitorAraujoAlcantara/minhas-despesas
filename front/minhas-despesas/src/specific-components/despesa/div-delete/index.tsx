import { useEffect } from "react";
import styled from "styled-components";
import { BoxBottom } from "../../../components/box";
import BtnSubmit from "../../../components/buttons/btn-submit";
import FormHeader, { FormHeaderDanger } from "../../../components/forms/form-header";
import { DespesaDto } from "../../../models/despesa-dto";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { despesaCrudSlice } from "../../../store/reducers/despesa";
import DivDespesaDetail from "../div-despesa-detail";

const DivRoot = styled.div`
    flex:1;
    display: flex;
`

const DivColumn = styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
`

const BoxHeader = styled(BoxBottom)`

`

const Form = styled.div`
    display: flex;
    flex: 1;
    flex-direction: column;
`

const FormBody = styled.div`
    display: flex;
    flex: 1;    
    padding: 10px;
    flex-direction: column;
`

const FormFooter = styled.div`
    display: flex;
    gap: 10px;
    button{
        flex: 1;
    }
`

interface DivDeleteProps {
    entity?: DespesaDto;
    onCancel: () => void;
    onDelete: () => void;
}

const DivDelete = (props: DivDeleteProps) => {
    const dispach = useAppDispatch();
    const { deleted, erro } = useAppSelector(state => state.despesa);

    useEffect(() => {
        dispach(despesaCrudSlice.clearData())
    },[])

    const handleDeleteItem = () =>{
        if ( ! props.entity){
            return;
        }
        dispach(despesaCrudSlice.deleteEntityById(props.entity?.despesaId));
    }

    if ( deleted ){
        props.onDelete();
        dispach(despesaCrudSlice.clearData())
    }

    return (
        <DivRoot>
            <DivColumn>
                <DivDespesaDetail
                    entity={props.entity}
                />
            </DivColumn>
            <DivColumn>
                <BoxHeader>
                    <FormHeaderDanger>
                        EXCLUSÃO
                    </FormHeaderDanger>
                </BoxHeader>
                <Form>
                    <FormBody>
                        <p>
                            Deseja realmente excluir a despesa selecionada?
                        </p>
                        <p>
                            <b>Atenção a operação é irreversível!</b>
                        </p>

                    </FormBody>

                    <FormFooter>
                       <BtnSubmit
                            caption="SIM"
                            onClick={() => handleDeleteItem()}
                       />
                       <BtnSubmit
                            caption="NÃO"
                            onClick={() => props.onCancel()}
                       />
                    </FormFooter>


                </Form>

            </DivColumn>
        </DivRoot>
    )
}

export default DivDelete;