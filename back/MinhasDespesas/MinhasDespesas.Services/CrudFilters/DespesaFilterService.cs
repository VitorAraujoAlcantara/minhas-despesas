using MinhasDespesas.Models.Entities;
using MinhasDespesas.Models.Filters;
using PtcSimpleCrud.Service.Interfaces;

namespace MinhasDespesas.Services.CrudFilters;

public class DespesaFilterService: ICrudFilterService<Despesa, DespesaFilter>
{
    public IQueryable<Despesa> Filter(IQueryable<Despesa> data, DespesaFilter filter)
    {
        return data;
    }
}