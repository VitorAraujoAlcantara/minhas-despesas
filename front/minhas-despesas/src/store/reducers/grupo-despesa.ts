import { GrupoDespesaCreateDto } from "../../models/grupo-despesa-create-dto";
import {  GrupoDespesaDto } from "../../models/grupo-despesa-dto";
import { GrupoDespesaFilterDto } from "../../models/grupo-despesa-filter-dto";
import CrudSlice from "../crud-slice";

export const grupoDespesaCrudSlice = CrudSlice<GrupoDespesaDto, GrupoDespesaFilterDto, GrupoDespesaDto, GrupoDespesaCreateDto>('GrupoDespesa', 'grupoDespesaId') ;