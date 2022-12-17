using MinhasDespesas.Models.Entities;
using MinhasDespesas.Models.Filters;
using PtcSimpleCrud.Service.Interfaces;

namespace MinhasDespesas.Services.CrudFilters;

public class DespesaPagamentoCrudFilterService: ICrudFilterService<DespesaPagamento, DespesaPagamentoFilter>
{
    public IQueryable<DespesaPagamento> Filter(IQueryable<DespesaPagamento> data, DespesaPagamentoFilter filter)
    {
        data = data.Where(x => x.DespesaId == filter.DespesaId);
        return data;
    }
}