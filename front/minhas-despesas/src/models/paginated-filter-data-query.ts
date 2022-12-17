import { PaginatedDataQuery } from "./paginated-data-query";

export interface PaginatedFilterDataQuery<T> extends PaginatedDataQuery {
    filter: T | any;
}