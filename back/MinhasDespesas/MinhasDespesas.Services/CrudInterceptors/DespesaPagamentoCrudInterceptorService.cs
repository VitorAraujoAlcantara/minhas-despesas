using MinhasDespesas.Models.Entities;
using MinhasDespesas.Models.Exceptions;
using PtcSimpleCrud.Repositories.Interfaces;
using PtcSimpleCrud.Service;

namespace MinhasDespesas.Services.CrudInterceptors;

public class DespesaPagamentoCrudInterceptorService: AbstractCrudInterceptorService<DespesaPagamento>
{
    private readonly ICrudRepository<Despesa> _despesaCrudRepository;
    private readonly ICrudRepository<Periodo> _periodoCrudRepository;

    public DespesaPagamentoCrudInterceptorService(
        ICrudRepository<Despesa> despesaCrudRepository,
        ICrudRepository<Periodo> periodoCrudRepository)
    {
        _despesaCrudRepository = despesaCrudRepository;
        _periodoCrudRepository = periodoCrudRepository;
    }

    public override async Task<DespesaPagamento?> BeforeCreateAsync(DespesaPagamento? entity)
    {
        if (entity == null)
        {
            return entity;
        }
        
        Despesa? despesa = await _despesaCrudRepository.GetByIdAsync(entity.DespesaId);
        if (despesa == null)
        {
            throw new CrudInterceptorValidateException("Despesa não localizada.");
        }

        if (Math.Round(despesa.ValorFalta, 2) < Math.Round(entity.Valor, 2))
        {
            throw new CrudInterceptorValidateException("Valor pago a maior que saldo devedor.");
        }

        return entity;
    }

    public override async Task<DespesaPagamento?> AfterCreateAsync(DespesaPagamento? entity)
    {
        if (entity == null)
        {
            return entity;
        }
        
        Despesa? despesa = await _despesaCrudRepository.GetByIdAsync(entity.DespesaId);
        if (despesa == null)
        {
            return entity;
        }
        double pago = Math.Round(entity.Valor,2);
        despesa.ValorPago += pago;
        despesa.ValorFalta -= pago;
        await _despesaCrudRepository.UpdateAsync(despesa);

        Periodo? periodo = await _periodoCrudRepository.GetByIdAsync(despesa.PeriodoId);
        if (periodo == null)
        {
            return entity;
        }
        periodo.ValorPago += pago;
        periodo.ValorFalta -= pago;
        await _periodoCrudRepository.UpdateAsync(periodo);

        return entity;
    }
}