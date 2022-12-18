using MinhasDespesas.Models.Entities;
using MinhasDespesas.Models.Enums;
using MinhasDespesas.Services.Interfaces;
using PtcSimpleCrud.Repositories.Interfaces;

namespace MinhasDespesas.Services;

public class ClonarPeriodoService: IClonarPeriodoService
{
    private readonly ICrudRepository<Periodo> _periodoRepository;

    public ClonarPeriodoService(ICrudRepository<Periodo> periodoRepository)
    {
        _periodoRepository = periodoRepository;
    }

    public async Task<Periodo?> Clonar(Guid periodoId, int mes, int ano)
    {
        var origin = await _periodoRepository.GetByIdAsync(periodoId);
        if (origin == null)
        {
            return null;
        }

        var newPeriodo = new Periodo
        {
            Mes = (Meses)mes,
            Ano = ano,
            ContaId = origin.ContaId,
            Despesas = origin.Despesas.Select(x => new Despesa()
            {
                Descricao = x.Descricao,
                Valor = Math.Round(x.Valor,2),
                ValorFalta = Math.Round(x.Valor,2),
                GrupoDespesaId = x.GrupoDespesaId
            }).ToList(),
            Valor = Math.Round(origin.Valor,2),
            ValorFalta = Math.Round(origin.Valor,2)
        };

        var ret = await _periodoRepository.CreateAsync(newPeriodo);
        
        return ret;
    }
}