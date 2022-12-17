import { DespesaDto } from "./despesa-dto";

export interface DespesaPagamentoDto{
    despesaPagamentoId: string;
    despesaId: string;
    despesa: DespesaDto;
    dataPagamento: Date;
    valor: number;
    observacao?: string;
}