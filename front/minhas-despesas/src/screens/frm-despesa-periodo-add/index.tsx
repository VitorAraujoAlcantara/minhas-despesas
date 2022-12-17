import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import styled from "styled-components";
import Box from "../../components/box";
import CrudAdd from "../../components/forms/crud-add";
import FormHeader from "../../components/forms/form-header";
import { PeriodoCreateDto } from "../../models/periodo-create-dto";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { periodoCrudSlice } from "../../store/reducers/periodo";
import { FormAddItemConfig, FormAddItemErroConfig, FormAddItemHidedConfig } from "../../types/form-add-item-config";

const DivRoot = styled(Box)`
    flex: 1;
    display: flex;
    flex-direction: column;
`

const FrmDespesaPeriodoAdd = () => {

    const dispach = useAppDispatch();
    const crudSlice = periodoCrudSlice;
    const {created, erro}  = useAppSelector( state => state.periodo);
    const {contaId} = useAppSelector( state => state.app);
    const [itemTemplate, setItemTemplate] = useState<PeriodoCreateDto>(
        {
            ano: (new Date().getFullYear() as number),
            mes: (new Date().getMonth() as number) +1,
            contaId: contaId
        }
    )

    const [started, setStarted] = useState<boolean>(false);
    const [cancel, setCancel] = useState<boolean>(false);

    

    useEffect(() => {
        dispach(crudSlice.clearData());
        setStarted(true);
    },[])


    const formConfigs: Array<FormAddItemConfig<PeriodoCreateDto> | FormAddItemHidedConfig<PeriodoCreateDto> | FormAddItemErroConfig >= [
        {
            fieldCaption: 'Ano',
            fieldName: 'ano',
            inputType: 'number',
            autoFocus: true,
            required: true
        },
        {
            fieldCaption: 'Mês',
            fieldName: 'mes',
            inputType: 'number',
            required: true
        },
        {
            fieldName: 'contaId',
            hidedValue: contaId
        }
    ]    

    if ( erro ){
        formConfigs.push({
            erroMessage: erro,            
        })
    }

    const handleOnSubmit = () => {        
        dispach( crudSlice.create(itemTemplate) )
    }

    if ( cancel === true || (started === true && created === true)){
        return <Navigate to='/expense' />
    }
    
    return (
        <DivRoot>
            <FormHeader>
                PERÍODO - NOVO CADASTRO
            </FormHeader>
            <CrudAdd<PeriodoCreateDto>
                title="PERÍODO"
                formConfigs={formConfigs}
                itemTemplate={itemTemplate}
                onSubmit={ handleOnSubmit}
                onUpdateTemplate={ item => setItemTemplate(
                    {...item, mes: parseInt(String(item.mes)), ano: parseInt(String(item.ano))})}
                onCancel={ () => setCancel(true)}
            />
        </DivRoot>
    )
}

export default FrmDespesaPeriodoAdd