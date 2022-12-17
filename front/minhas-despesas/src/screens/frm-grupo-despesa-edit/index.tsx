import { useEffect, useState } from "react";
import { Navigate, useParams } from "react-router-dom";
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

const FrmGrupoDespesaEdit = () => {

    const { id } = useParams();

    const dispach = useAppDispatch();
    const crudSlice = grupoDespesaCrudSlice;
    const { updated, entity } = useAppSelector(state => state.grupoDespesa);
    const { contaId } = useAppSelector(state => state.app);
    const [started, setStarted] = useState<boolean>(false);
    const [cancel, setCancel] = useState<boolean>(false);
    const [itemTemplate, setItemTemplate] = useState<GrupoDespesaCreateDto>({
        contaId: ''
    });



    useEffect(() => {
        dispach(crudSlice.clearData());
        setStarted(true);
    }, [])

    useEffect(() => {
        if (!entity) {
            return;
        }
        setItemTemplate({
            grupoDespesaId: entity.grupoDespesaId,
            contaId: entity.conta?.contaId ?? contaId,
            codigo: entity.codigo,
            nome: entity.nome,
            grupoDespesaPaiGrupoDespesaId: entity.grupoDespesaPai?.grupoDespesaId
        })
    }, [entity])

    useEffect(() => {
        if (!started) {
            return;
        }

        dispach(crudSlice.getEntityById(id as string));

    }, [started])


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
        {
            fieldName: 'contaId',
            hidedValue: contaId
        }
    ]

    const handleOnSubmit = () => {
        if (entity) {
            dispach(crudSlice.update(itemTemplate))
        }
    }

    if (cancel === true || (started === true && updated === true)) {
        return <Navigate to='/group' />
    }

    return (
        <DivRoot>
            <FormHeader>
                GRUPO DE DESPESA - EDITAR CADASTRO
            </FormHeader>
            <CrudAdd<GrupoDespesaCreateDto>
                title="GRUPO DE DESPESAS"
                formConfigs={formConfigs}
                itemTemplate={itemTemplate}
                onSubmit={handleOnSubmit}
                onUpdateTemplate={item => {
                    setItemTemplate({ ...item })
                }
                }
                onCancel={() => setCancel(true)}
            />

        </DivRoot>
    )
}

export default FrmGrupoDespesaEdit