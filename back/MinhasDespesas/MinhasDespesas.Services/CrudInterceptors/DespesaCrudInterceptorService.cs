using MinhasDespesas.Models.Entities;
using PtcSimpleCrud.Repositories.Interfaces;
using PtcSimpleCrud.Service;

namespace MinhasDespesas.Services.CrudInterceptors;

public class DespesaCrudInterceptorService: AbstractCrudInterceptorService<Despesa>
{
    private readonly ICrudRepository<Periodo> _periodoCrudRepository;
    private readonly ICrudRepository<Despesa> _despesaCrudRepository;

    public DespesaCrudInterceptorService(
        ICrudRepository<Periodo> periodoCrudRepository,
        ICrudRepository<Despesa> despesaCrudRepository)
    {
        _periodoCrudRepository = periodoCrudRepository;
        _despesaCrudRepository = despesaCrudRepository;
    }

    public override Task<Despesa?> BeforeCreateAsync(Despesa? entity)
    {
        if (entity == null)
        {
            return Task.FromResult<Despesa?>(entity);
        }

        entity.Valor = Math.Round(entity.Valor, 2);
        entity.ValorFalta = Math.Round(entity.Valor,2);
        return Task.FromResult<Despesa?>(entity);
    }

    public override async Task<Despesa?> AfterCreateAsync(Despesa? entity)
    {
        if (entity == null)
        {
            return entity;
        }
        Periodo? periodo = await  _periodoCrudRepository.GetByIdAsync(entity.PeriodoId);
        if (periodo == null)
        {
            return entity;
        }
        periodo.Valor += Math.Round(entity.Valor,2);
        periodo.ValorFalta += Math.Round( entity.ValorFalta,2);
        await _periodoCrudRepository.UpdateAsync(periodo);
        return entity;
    }

    public override async Task<Guid> BeforeDeleteAsync(Guid id)
    {
        Despesa? despesa = await _despesaCrudRepository.GetByIdAsync(id);
        if (despesa == null)
        {
            return id;
        }
        
        Periodo? periodo = await  _periodoCrudRepository.GetByIdAsync(despesa.PeriodoId);
        if (periodo == null)
        {
            return id;
        }

        periodo.ValorPago -= Math.Round(despesa.ValorPago,2);
        periodo.ValorFalta -= Math.Round(despesa.ValorFalta,2);
        periodo.Valor -= Math.Round(despesa.Valor,2);
        await _periodoCrudRepository.UpdateAsync(periodo);

        return id;
    }
}