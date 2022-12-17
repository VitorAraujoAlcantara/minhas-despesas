using MinhasDespesas.Models.Entities;
using MinhasDespesas.Models.Filters;
using PtcSimpleCrud.Service.Interfaces;

namespace MinhasDespesas.Services.CrudFilters;

public class PeriodoFilterService: ICrudFilterService<Periodo, PeriodoFilter>
{
    public IQueryable<Periodo> Filter(IQueryable<Periodo> data, PeriodoFilter filter)
    {
        return data;
    }
}