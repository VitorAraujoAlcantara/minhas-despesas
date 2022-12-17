export interface DespesaCreateDto {
    despesaId?: string;
    periodoId: string;
    grupoDespesaId: string;
    dataCadastro?: Date;
    dataVencimento?: Date;
    dataQuitacao?: Date;
    descricao: string;
    valor: number;    
}