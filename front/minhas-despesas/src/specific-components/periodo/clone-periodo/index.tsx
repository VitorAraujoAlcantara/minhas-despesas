import { useEffect, useState } from "react";
import styled from "styled-components";
import { BoxBottom } from "../../../components/box";
import BtnSubmit from "../../../components/buttons/btn-submit";
import FormHeader from "../../../components/forms/form-header";
import LabelBold from "../../../components/labels/label-bold";
import { ClonarPeriodoDto } from "../../../models/clonar-periodo-dto";
import { PeriodoDto } from "../../../models/periodo-dto";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { clearData, clonePeriodo } from "../../../store/reducers/periodo-util";

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

const SubTitleDiv = styled(BoxBottom)`
    padding: 10px;
    display: flex;
    gap: 10px;
`
function addMonths(numOfMonths: number, date = new Date()) {
    date.setMonth(date.getMonth() + numOfMonths);

    return date;
}


interface ClonePeriodoProps {
    entity?: PeriodoDto;
    onCancel: () => void;
    onClone: () => void;
}



const ClonePeriodo = (props: ClonePeriodoProps) => {
    const dispach = useAppDispatch();
    const { clonned, erro } = useAppSelector(state => state.periodoUtil);
    const { entity } = props;
    const [novaData, setNovaData] = useState<Date>(addMonths(1));
    const [cloneInfo, setCloneInfo] = useState<ClonarPeriodoDto>({
        mes: 0,
        ano: 0,
        periodoId: ''
    });

    useEffect(() => {
        dispach(clearData())
    }, [])

    useEffect(() => {
        if (!entity) {
            return;
        }

        setNovaData(addMonths(1, new Date(entity.ano, entity.mes -1 , 1)))

        setCloneInfo(
            { ...cloneInfo, periodoId: entity.periodoId }
        );
    }, [entity])

    useEffect(() => {
        if (!novaData) {
            return;
        }

        setCloneInfo(
            { ...cloneInfo, mes: novaData.getMonth() + 1, ano: novaData.getFullYear() }
        );
    }, [novaData])

    useEffect(() => {
        if ( ! clonned){
            return;
        }        

        props.onClone();
    },[clonned])

    const handleYesButtoClick = ( ) => {
        if ( ! cloneInfo){
            return;
        }

        if ( ! entity){
            return;
        }

        dispach(clonePeriodo({...cloneInfo, periodoId: entity?.periodoId}));
    }

    return (
        <DivRoot>
            <BoxBottom>
                <FormHeader>
                    CLONAR PERÍODO
                </FormHeader>
            </BoxBottom>     
            <SubTitleDiv>                
                {`Clone de: ${entity? entity.ano : 0}/${entity?  entity.mes: 0 } para ${cloneInfo.ano}/${cloneInfo.mes}`}
            </SubTitleDiv>       
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
                    onClick={handleYesButtoClick}
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