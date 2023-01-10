using Microsoft.EntityFrameworkCore;
using MinhasDespesas.Models.Entities;
using MinhasDespesas.Models.Filters;
using PtcSimpleCrud.Service.Interfaces;

namespace MinhasDespesas.Services.CrudFilters;

public class DespesaFilterService : ICrudFilterService<Despesa, DespesaFilter>
{
    public IQueryable<Despesa> Filter(IQueryable<Despesa> data, DespesaFilter filter)
    {
        data = data.Where(x => x.PeriodoId == filter.PeriodoId && x.Periodo.ContaId == filter.ContaId);

        if (!string.IsNullOrEmpty(filter.Descricao))
        {
            data = data.Where(x => EF.Functions.Like(x.Descricao, $"%{filter.Descricao}%"));
        }

        if (filter.Valor.HasValue && filter.Valor.Value > 0)
        {
            data = data.Where(x => x.Valor == filter.Valor.Value);
        }

        if (filter.ValorFalta.HasValue)
        {
            data = data.Where(x => x.ValorFalta == filter.ValorFalta.Value);
        }

        if (filter.ValorPago.HasValue)
        {
            data = data.Where(x => x.ValorPago == filter.ValorPago.Value);
        }

        if (filter.ApenasPagos.HasValue)
        {
            data = data.Where(x => x.ValorPago > 0);
        }

        if (filter.ApenasPendentes.HasValue)
        {
            data = data.Where(x => x.ValorFalta > 0);
        }

        if (filter.GrupoDespesaId.HasValue)
        {
            data = data.Where(x => x.GrupoDespesaId == filter.GrupoDespesaId.Value);
        }
        return data;
    }
}