import { ContaDto } from "./conta-dto";

export interface GrupoDespesaDto{
    grupoDespesaId?: string;
    conta?: ContaDto;
    grupoDespesaPai?: GrupoDespesaDto;
    nome?: string;
    codigo?: string;
}