export interface PaginatedDataQuery {
    itensPerPage: number;
    page: number;
    order: string | null;
}