import styled from "styled-components";
import { PaginationResponse } from "../../../models/pagination-reponse";
import { TableItemConfig } from "../../../types/table-item-config";
import BtnIcon from "../../buttons/btn-icon";
import TableDefault from "../../tables/table-default";

const DivRoot = styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
`

const FormToolBar = styled.div`
    display: flex;
    padding: 0px 10px;
    box-shadow:  0px 0px 10px #cccccc07;
    border-bottom: 1px solid #cccccc1f;    
`

const FormSearchBar = styled.div`
    display: flex;
    padding: 10px;
    box-shadow:  0px 0px 10px #cccccc07;
    border-bottom: 1px solid #cccccc1f;
    font-size: 0.5rem;
`

const FormBody = styled.div`
    display: flex;
    flex: 1;    
`

interface CrudSearchProps<CrudType> {    
    filterElement?: React.ReactNode;
    data?: PaginationResponse<CrudType>;
    tableItemConfigs: Array<TableItemConfig<CrudType>>;
    renderActionCell?: (item: CrudType) => React.ReactNode;
}

function CrudSearch<CrudType>(props: CrudSearchProps<CrudType>){
    return (
        <DivRoot>
            <FormToolBar>
                <BtnIcon
                    caption="Novo"
                    icon="plus"
                    size="normal"     
                    to="add"               
                />
            </FormToolBar>
            <FormSearchBar>
                {props.filterElement}
            </FormSearchBar>
            <FormBody>
                <TableDefault
                    tableItemConfigs={props.tableItemConfigs}
                    data={props.data}     
                    renderActionCell={props.renderActionCell}               
                />
            </FormBody>
        </DivRoot>
    )
}

export default CrudSearch