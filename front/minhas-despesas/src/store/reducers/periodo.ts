import { PeriodoCreateDto } from "../../models/periodo-create-dto";
import { PeriodoDto } from "../../models/periodo-dto";
import { PeriodoFilterDto } from "../../models/periodo-filter-dto";
import CrudSlice from "../crud-slice";

export const periodoCrudSlice = CrudSlice<PeriodoDto, PeriodoFilterDto, PeriodoCreateDto>('Periodo', 'periodoId');