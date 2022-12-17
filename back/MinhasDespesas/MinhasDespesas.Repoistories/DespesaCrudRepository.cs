using Microsoft.EntityFrameworkCore;
using MinhasDespesas.Models.Entities;
using PtcSimpleCrud.Repositories;

namespace MinhasDespesas.Repoistories;

public class DespesaCrudRepository: CrudRepository<Despesa, MinhasDespesasContext>
{
    public DespesaCrudRepository(MinhasDespesasContext context) : base(context)
    {
    }

    public override IQueryable<Despesa> GetAll()
    {
        return context.Despesas.Include(x => x.GrupoDespesa);
    }

    public override Task<Despesa?> GetByIdAsync(Guid id)
    {
        return GetAll().FirstOrDefaultAsync(x => x.DespesaId == id);
    }
}