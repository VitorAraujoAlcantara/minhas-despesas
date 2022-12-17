using MinhasDespesas.Models.Entities;
using MinhasDespesas.Models.Filters;
using PtcSimpleCrud.Service.Interfaces;

namespace MinhasDespesas.Services.CrudFilters;

public class GrupoDespesaFilterService: ICrudFilterService<GrupoDespesa, GrupoDespesaFilter>
{
    public IQueryable<GrupoDespesa> Filter(IQueryable<GrupoDespesa> data, GrupoDespesaFilter filter)
    {
        if (filter.ContaId != Guid.Empty)
        {
            data = data.Where(x => x.ContaId == filter.ContaId);
        }
        return data;
    }
}