import { DespesaCreateDto } from "../../models/despesa-create-dto";
import { DespesaDto } from "../../models/despesa-dto";
import { DespesaFilterDto } from "../../models/despesa-filter-dto";
import CrudSlice from "../crud-slice";

export const despesaCrudSlice = CrudSlice<DespesaDto, DespesaFilterDto, DespesaCreateDto>('Despesa', 'despesaId');