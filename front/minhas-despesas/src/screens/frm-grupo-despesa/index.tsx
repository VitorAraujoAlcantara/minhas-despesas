import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import styled from "styled-components";
import Box, { BoxBottom } from "../../components/box";
import BtnIcon from "../../components/buttons/btn-icon";
import CrudSearch from "../../components/forms/crud-search";
import FormHeader from "../../components/forms/form-header";
import { GrupoDespesaDto } from "../../models/grupo-despesa-dto";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { grupoDespesaCrudSlice } from "../../store/reducers/grupo-despesa";
import { TableItemConfig } from "../../types/table-item-config";

const DivRoot = styled.div`
    display: flex;
    flex: 1;
    
`

const Form = styled(Box)`
    display: flex;
    flex-direction: column;
    flex: 1;    
`

const DivAction = styled.div`
    display: flex;
`

const tableItemConfigs: Array<TableItemConfig<GrupoDespesaDto>> = [
    {
        fieldCaption: 'CÓDIGO',
        fieldName: 'codigo',
        renderValue: 'codigo'
    },
    {
        fieldCaption: 'NOME',
        fieldName: 'nome',
        renderValue: 'nome'
    },
    {
        fieldCaption: 'DESPESA MÃE',
        fieldName: 'codigo',
        renderValue: (value: GrupoDespesaDto): string => {
            if (value.grupoDespesaPai && value.grupoDespesaPai.nome) {
                return value.grupoDespesaPai.nome;
            }
            return '';
        }
    },


]

const FrmGrupoDespesa = () => {
    const dispach = useAppDispatch();
    const { data, deleted } = useAppSelector(state => state.grupoDespesa)
    const [idToEdit, setIdToEdit] = useState<string>('')

    const crudSlice = grupoDespesaCrudSlice;

    useEffect(() => {
        dispach(
            crudSlice.getItemsByFilter({
                itensPerPage: 10,
                order: 'Nome',
                page: 1,
                filter: {

                }
            })
        )
    }, [])

    useEffect(() => {
        if (!deleted) {
            return;
        }

        dispach(
            crudSlice.getItemsByFilter({
                itensPerPage: 10,
                order: 'Nome',
                page: 1,
                filter: {

                }
            })
        )

    }, [deleted])

    const renderActioncell = (item: GrupoDespesaDto) => {
        return (
            <DivAction>
                <BtnIcon
                    icon="minus"
                    size="small"
                    caption="Remover"
                    onClick={() => dispach(crudSlice.deleteEntityById(item.grupoDespesaId ?? ''))}
                />

                <BtnIcon
                    icon="edit"
                    size="small"
                    caption="Editar"
                    onClick={ () => setIdToEdit(item.grupoDespesaId ?? '') }
                />
            </DivAction>
        )
    }

    if ( idToEdit ){
        return (
            <Navigate to={`${idToEdit}/edit`} />
        )
    }
    return (
        <DivRoot>
            <Form>
                <FormHeader>
                    GRUPO DE DESPESA
                </FormHeader>

                <CrudSearch<GrupoDespesaDto>
                    tableItemConfigs={tableItemConfigs}
                    data={data}
                    renderActionCell={renderActioncell}
                />



            </Form>
        </DivRoot>
    )
}

export default FrmGrupoDespesa