using MinhasDespesas.Models.Entities;
using PtcSimpleCrud.Service.Interfaces;

namespace MinhasDespesas.Services.Interfaces;

public interface IGrupoDespesaCrudService: ICrudService<GrupoDespesa>
{
    Task<IList<GrupoDespesa>> ObterGruposDespesasRaizAsync(Guid contaContaId);
    Task<IList<GrupoDespesa>> ObterGruposDespesaAsync(Guid gurpoDespesaId);
}