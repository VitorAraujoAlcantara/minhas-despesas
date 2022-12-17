import { ContaDto } from "./conta-dto"
import { DespesaDto } from "./despesa-dto"

export interface PeriodoDto {
    periodoId: string,
    conta: ContaDto,
    contaId: string,
    mes: number,
    ano: number,
    despesas: Array<DespesaDto>,
    valor: number,
    valorPago: number,
    valorFalta: number
}