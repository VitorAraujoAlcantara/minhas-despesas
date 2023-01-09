import { ContaCreateDto } from "../../models/conta-create-dto";
import { ContaDto } from "../../models/conta-dto";
import { ContaFilterDto } from "../../models/conta-filter-dto";
import CrudSlice from "../crud-slice";

export const contaCrudSlice = CrudSlice<ContaDto, ContaFilterDto, ContaCreateDto>('Conta', 'contaId');