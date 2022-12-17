using Microsoft.EntityFrameworkCore;
using MinhasDespesas.Models.Entities;
using PtcSimpleCrud.Repositories;

namespace MinhasDespesas.Repoistories;

public class GrupoDespesaCrudRepository: CrudRepository<GrupoDespesa, MinhasDespesasContext >
{
    public GrupoDespesaCrudRepository(MinhasDespesasContext context) : base(context)
    {
    }

    public override IQueryable<GrupoDespesa> GetAll()
    {
        return context.GrupoDespesas
            .Include(x => x.Conta)
            .Include(x => x.GrupoDespesaPai);
    }

    public override Task<GrupoDespesa?> GetByIdAsync(Guid id)
    {
        return GetAll().FirstOrDefaultAsync(x => x.GrupoDespesaId == id);
    }
}