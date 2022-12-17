export interface DespesaPagamentoCreateDto{
    despesaPagamentoId?: string;
    despesaId: string;        
    valor: number;
    observacao?: string;
}