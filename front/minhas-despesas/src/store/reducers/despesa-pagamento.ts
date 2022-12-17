import { DespesaPagamentoCreateDto } from "../../models/despesa-pagamento-create-dto";
import { DespesaPagamentoDto } from "../../models/despesa-pagamento-dto";
import { DespesaPagamentoFilterDto } from "../../models/despesa-pagamento-filter-dto";
import CrudSlice from "../crud-slice";

export const despesaPagamentoCrudSlice = CrudSlice<DespesaPagamentoDto, DespesaPagamentoFilterDto, DespesaPagamentoDto, DespesaPagamentoCreateDto>('DespesaPagamento', 'despesaPagamentoId');