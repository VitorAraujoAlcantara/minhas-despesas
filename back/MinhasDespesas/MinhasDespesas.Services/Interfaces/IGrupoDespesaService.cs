using MinhasDespesas.Models.Entities;

namespace MinhasDespesas.Services.Interfaces
{
    public interface IGrupoDespesaService
    {
        Task<GrupoDespesa?> AtualizaGrupoDespesaAsync(GrupoDespesa? grupoDespesa);
        Task<GrupoDespesa?> CriarNovoGrupoDespesaAsync(Conta conta, GrupoDespesa? grupoDespesaPai, string nome, string codigo);
        Task<IList<GrupoDespesa>?> ObterGruposDespesaRaizAsync(Conta? conta);
        Task<IList<GrupoDespesa>?> ObterGruposDespesaAsync(GrupoDespesa? grupoDespesaPai);
        
    }
}
