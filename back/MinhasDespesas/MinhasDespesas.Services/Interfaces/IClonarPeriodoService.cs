using MinhasDespesas.Models.Entities;

namespace MinhasDespesas.Services.Interfaces;

public interface IClonarPeriodoService
{
    Task<Periodo?> Clonar(Guid periodoId, int mes, int ano);
}