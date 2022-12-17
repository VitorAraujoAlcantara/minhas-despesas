using Microsoft.EntityFrameworkCore;
using MinhasDespesas.Models.Entities;
using MinhasDespesas.Services.Interfaces;
using PtcSimpleCrud.Repositories.Interfaces;
using PtcSimpleCrud.Service;
using PtcSimpleCrud.Service.Interfaces;

namespace MinhasDespesas.Services.CrudService
{
    internal class GrupoDespesaCrudService : CrudService<GrupoDespesa>, IGrupoDespesaCrudService
    {
        public GrupoDespesaCrudService(ICrudRepository<GrupoDespesa> crudRepository, IPaginationService<GrupoDespesa> paginationService) : base(crudRepository, paginationService)
        {
        }

        public async Task<IList<GrupoDespesa>> ObterGruposDespesasRaizAsync(Guid contaContaId)
        {
            var query = crudRepository.GetAll();
            return await query.Where(x => x.Conta.ContaId == contaContaId).ToListAsync();
        }

        public async Task<IList<GrupoDespesa>> ObterGruposDespesaAsync(Guid gurpoDespesaId)
        {
            var query = crudRepository.GetAll();
            return await query.Where(x => x.GrupoDespesaPai != null && x.GrupoDespesaPai.GrupoDespesaId == gurpoDespesaId).ToListAsync();
        }
    }
}
