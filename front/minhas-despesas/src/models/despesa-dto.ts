import { GrupoDespesaDto } from "./grupo-despesa-dto";
import { PeriodoDto } from "./periodo-dto";

export interface DespesaDto {
    despesaId: string;
    periodo?: PeriodoDto;
    grupoDespesa: GrupoDespesaDto;
    dataCadastro: Date;
    dataVencimento?: Date;
    dataQuitacao?: Date;
    descricao: string;
    valor: number;
    valorPago: number;
    valorFalta: number;
}