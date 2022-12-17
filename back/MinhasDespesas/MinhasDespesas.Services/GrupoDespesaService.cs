using MinhasDespesas.Models.Entities;
using MinhasDespesas.Services.Interfaces;

namespace MinhasDespesas.Services
{
    internal class GrupoDespesaService : IGrupoDespesaService
    {
        private readonly IGrupoDespesaCrudService _crudService;
        public GrupoDespesaService(IGrupoDespesaCrudService crudService)
        {
            _crudService = crudService;
        }

        public async Task<GrupoDespesa?> AtualizaGrupoDespesaAsync(GrupoDespesa? grupoDespesa)
        {
            if ( grupoDespesa == null)
            {
                return null;
            }
            return await _crudService.UpdateAsync(grupoDespesa);
        }
 
        public async Task<GrupoDespesa?> CriarNovoGrupoDespesaAsync(Conta conta, GrupoDespesa? grupoDespesaPai, string nome, string codigo)
        {
            GrupoDespesa grupo = new GrupoDespesa
            {
                Conta = conta ,
                GrupoDespesaPai= grupoDespesaPai ,
                Nome = nome ,
                Codigo = codigo
            };

            return await _crudService.CreateAsync(grupo);
        }

        public async Task<IList<GrupoDespesa>?> ObterGruposDespesaAsync(GrupoDespesa? grupoDespesaPai)
        {
            if (grupoDespesaPai == null)
            {
                return null;
            }

            return await _crudService.ObterGruposDespesaAsync(grupoDespesaPai.GrupoDespesaId);
        }

        public async Task<IList<GrupoDespesa>?> ObterGruposDespesaRaizAsync(Conta? conta)
        {
            if (conta == null)
            {
                return null;
            }
            
            return await _crudService.ObterGruposDespesasRaizAsync(conta.ContaId);
        }
    }
}
