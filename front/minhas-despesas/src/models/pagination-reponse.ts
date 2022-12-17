import { PageInfoDto } from "./page-info-dto"

export interface PaginationResponse<T> {
    pageInfo: PageInfoDto
    itens: T[]
}