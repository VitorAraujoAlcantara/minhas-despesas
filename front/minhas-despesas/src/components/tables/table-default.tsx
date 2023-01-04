import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { PaginationResponse } from "../../models/pagination-reponse";
import { TableItemConfig } from "../../types/table-item-config";

const DivRoot = styled.div`
    display: flex;
    flex: 1;
    align-items : baseline ;
    /* padding: 0px 10px 10px 10px; */
    overflow: auto;
`

const Table = styled.table`
    flex: 1;        
    font-size: 0.9rem;
    border-spacing: 0px;
    overflow: auto;
`

const Thead = styled.thead`
    
`

const Tbody = styled.tbody`
    tr{
        transition: 1s;
        &:hover{
            /* background-color:  #cccccc0b; */
            background-color: ${props => props.theme.palette.secondary.main};
            color: ${props => props.theme.palette.secondary.contrastText};
        }
    }
`

const Th = styled.th`
    text-align: left;
    box-shadow:  0px 0px 10px #cccccc07;
    border-bottom: 1px solid #cccccc1f;
    padding: 10px;
    font-weight: bold;
    position: sticky;
    top: 0;    
    background-color: ${props => props.theme.palette.secondary.main};
    color: ${props => props.theme.palette.secondary.contrastText};
`

const Td = styled.td`
    text-align: left;
    padding: 10px 10px;
    font-weight: lighter;
    
`

const Tr = styled.tr`
    
`

interface TableDefaultProps<CrudType> {
    data?: PaginationResponse<CrudType>;
    itens?: Array<CrudType>;
    tableItemConfigs: Array<TableItemConfig<CrudType>>;
    renderActionCell?: (item: CrudType) => React.ReactNode;
}

function TableDefault<CrudType>(props: TableDefaultProps<CrudType>) {

    const [itens, setItens] = useState<Array<CrudType>>([]);

    useEffect(() => {
        if ( ! props.data ){
            return;
        }

        setItens(props.data.itens);
    },[props.data])

    useEffect(() => {
        if ( ! props.itens ){
            return;
        }

        setItens(props.itens);

    },[props.itens])

    const RenderTdContent = (config: TableItemConfig<CrudType>, item: CrudType) => {
        if ( typeof config.renderValue === 'function' ){
            return (
                config.renderValue(item)
            )
        }

        if ( typeof config.renderValue === 'string'){
            return(
                (item as any)[config.renderValue]
            )
        }
    }

    return (
        <DivRoot>
            <Table>
                <Thead>
                    <Tr>
                        {props.tableItemConfigs.map((item, index) => {
                            return (
                                <Th key={index}>{item.fieldCaption}</Th>
                            )
                        })}
                        {props.renderActionCell && 
                            <Th>&nbsp;</Th>
                        }
                        
                    </Tr>
                </Thead>
                <Tbody>
                    {itens &&  itens.map((item, index) => {
                        return (
                            <Tr key={index}>
                                {props.tableItemConfigs.map((itemConfig, indexConfig) => {
                                    return (
                                        <Td key={indexConfig}>
                                            {RenderTdContent(itemConfig, item)}
                                        </Td>
                                    )
                                })}
                                {props.renderActionCell && 
                                    props.renderActionCell(item)
                                }
                            </Tr>
                        )
                    })}
                </Tbody>
            </Table>
        </DivRoot>
    )
}

export default TableDefault