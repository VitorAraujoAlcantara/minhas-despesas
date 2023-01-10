export interface DespesaFilterDto {
    valor?: number;
    valorPago?: number;
    valorFalta?: number;
    grupoDespesaId?: string;
    apenasPagos?: boolean;
    apenasPendentes?: boolean;
    descricao?: string;
    periodoId: string;
}