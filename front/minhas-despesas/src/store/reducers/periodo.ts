import { PeriodoCreateDto } from "../../models/periodo-create-dto";
import { PeriodoDto } from "../../models/periodo-dto";
import { PeriodoErrosDto } from "../../models/periodo-errors-dto";
import { PeriodoFilterDto } from "../../models/periodo-filter-dto";
import CrudSlice from "../crud-slice";

export const periodoCrudSlice = CrudSlice<PeriodoDto, PeriodoFilterDto, PeriodoErrosDto, PeriodoCreateDto>('Periodo', 'periodoId') ;