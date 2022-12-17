import { PaginatedFilterDataQuery } from "../models/paginated-filter-data-query";
import { PaginationResponse } from "../models/pagination-reponse";
import { deleteItem, get, post, put } from "./api";

function crudApi<CrudType, CrudFilterType, CrudCreateType>(prefix: string) {
    return {
        update: async (id: string | undefined, data?: CrudCreateType) => put<CrudCreateType, CrudType>(`${prefix}/${id}`, data),
        create: async (data: CrudCreateType) => post<CrudCreateType, CrudType>(`${prefix}`, data),
        deleteData: async (id: string) => deleteItem<void>(`${prefix}/${id}`),
        getById: async (id: string) => get<CrudType>(`${prefix}/${id}`),
        getByFilter: async (data: PaginatedFilterDataQuery<CrudFilterType>) => {
            let filterString = '';
            const keys = Object.keys(data.filter);

            keys.forEach(x => {
                const item = (data.filter as any)[x];
                if (!item) {
                    return;
                }

                if (Array.isArray(item)) {
                    item.forEach(element => filterString += `&${x}=${element}`);
                    return;
                }

                filterString += `&${x}=${item}`;
            })

            return get<PaginationResponse<CrudType>>(`${prefix}/filter?ItensPerPage=${data.itensPerPage ? data.itensPerPage : 10}&Page=${data.page ? data.page : 1}&Order=${data.order}${filterString}`);
        },
    }
}

export default crudApi