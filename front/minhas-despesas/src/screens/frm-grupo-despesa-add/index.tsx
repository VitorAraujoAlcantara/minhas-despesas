import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import styled from "styled-components";
import Box, { BoxBottom } from "../../components/box";
import CrudAdd from "../../components/forms/crud-add";
import FormHeader from "../../components/forms/form-header";
import { GrupoDespesaCreateDto } from "../../models/grupo-despesa-create-dto";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { grupoDespesaCrudSlice } from "../../store/reducers/grupo-despesa";
import { FormAddItemConfig, FormAddItemHidedConfig } from "../../types/form-add-item-config";

const DivRoot = styled(Box)`
    flex: 1;
    display: flex;
    flex-direction: column;
`

const FrmGrupoDespesaAdd = () => {

    const dispach = useAppDispatch();
    const crudSlice = grupoDespesaCrudSlice;
    const { created } = useAppSelector(state => state.grupoDespesa);
    const [itemTemplate, setItemTemplate] = useState<GrupoDespesaCreateDto>(
        {
            contaId: '00000000-0000-0000-0000-000000000000'
        }
    )

    const [started, setStarted] = useState<boolean>(false);
    const [cancel, setCancel] = useState<boolean>(false);



    useEffect(() => {
        dispach(crudSlice.clearData());
        setStarted(true);
    }, [])


    const formConfigs: Array<FormAddItemConfig<GrupoDespesaCreateDto> | FormAddItemHidedConfig<GrupoDespesaCreateDto>> = [
        {
            fieldCaption: 'Código',
            fieldName: 'codigo',
            inputType: 'text',
            autoFocus: true,
            required: true
        },
        {
            fieldCaption: 'Nome',
            fieldName: 'nome',
            inputType: 'text',
            required: true
        },
    ]

    const handleOnSubmit = () => {
        dispach(crudSlice.create(itemTemplate))
    }

    if (cancel === true || (started === true && created === true)) {
        return <Navigate to='/group' />
    }

    return (
        <DivRoot>
            <FormHeader>
                GRUPO DE DESPESA - NOVO CADASTRO
            </FormHeader>
            <CrudAdd<GrupoDespesaCreateDto>
                title="GRUPO DE DESPESAS"
                formConfigs={formConfigs}
                itemTemplate={itemTemplate}
                onSubmit={handleOnSubmit}
                onUpdateTemplate={item => setItemTemplate(item)}
                onCancel={() => setCancel(true)}
            />

        </DivRoot>
    )
}

export default FrmGrupoDespesaAdd