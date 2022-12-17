using Microsoft.EntityFrameworkCore;
using MinhasDespesas.Models.Entities;
using PtcSimpleCrud.Repositories;

namespace MinhasDespesas.Repoistories;

public class PeriodoCrudRepository: CrudRepository<Periodo, MinhasDespesasContext>
{
    public PeriodoCrudRepository(MinhasDespesasContext context) : base(context)
    {
    }

    public override IQueryable<Periodo> GetAll()
    {
        return context.Periodos
            .Include(x => x.Conta)
            .Include(x => x.Despesas)
            .ThenInclude(x => x.GrupoDespesa);
    }

    public override Task<Periodo?> GetByIdAsync(Guid id)
    {
        return GetAll().FirstOrDefaultAsync(x => x.PeriodoId == id);
    }
}