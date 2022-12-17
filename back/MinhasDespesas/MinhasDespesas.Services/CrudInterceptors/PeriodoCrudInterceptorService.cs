using MinhasDespesas.Models.Entities;
using MinhasDespesas.Models.Exceptions;
using PtcSimpleCrud.Repositories.Interfaces;
using PtcSimpleCrud.Service;

namespace MinhasDespesas.Services.CrudInterceptors;

public class PeriodoCrudInterceptorService: AbstractCrudInterceptorService<Periodo>
{
    private readonly ICrudRepository<Periodo> _crudRepository;

    public PeriodoCrudInterceptorService(ICrudRepository<Periodo> crudRepository)
    {
        _crudRepository = crudRepository;
    }
    public override async Task<Periodo?> BeforeCreateAsync(Periodo? entity)
    {
        if (await _crudRepository.FirstOrDefaultAsync(x => x.Ano == entity.Ano && x.Mes == entity.Mes) !=
            default(Periodo))
        {
            throw new CrudInterceptorValidateException($"Já existe um período aberto para {entity.Ano}/{entity.Mes}!");
        }

        return entity;
    }
}