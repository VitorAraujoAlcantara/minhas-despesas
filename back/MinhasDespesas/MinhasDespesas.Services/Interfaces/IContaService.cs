using MinhasDespesas.Models.Entities;

namespace MinhasDespesas.Services.Interfaces
{
    public interface IContaService
    {
        Task<bool> ExisteAsync(string email);
        Task<Conta?> ObtemContaAsync(string email);
        Task<Conta?> CadastraContaAsync(Conta conta);
        Task<Conta?> DesativaContaAsync(Conta conta);
    }
}
