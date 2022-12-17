using MinhasDespesas.Models.Entities;
using MinhasDespesas.Models.Enums;
using MinhasDespesas.Models.Objects;

namespace MinhasDespesas.Services.Interfaces
{
    public interface IPeriodoService
    {
        Task<Periodo?> AbrirPeriodoAsync(AberturaPeriodo aberturaPeriodo);
        Task<Periodo?> ObterPeriodoPeloAnoMes(int anot, Meses mes);
    }
}
