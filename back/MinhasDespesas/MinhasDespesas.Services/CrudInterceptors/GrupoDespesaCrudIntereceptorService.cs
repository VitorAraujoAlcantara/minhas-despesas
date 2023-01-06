using MinhasDespesas.Models.Entities;
using MinhasDespesas.Models.Exceptions;
using PtcSimpleCrud.Repositories.Interfaces;
using PtcSimpleCrud.Service;

namespace MinhasDespesas.Services.CrudInterceptors;

public class GrupoDespesaCrudIntereceptorService : AbstractCrudInterceptorService<GrupoDespesa>
{
    private readonly ICrudRepository<Despesa> _despesaCrudRepository;

    public GrupoDespesaCrudIntereceptorService(
        ICrudRepository<Despesa> despesaCrudRepository
        )
    {
        _despesaCrudRepository = despesaCrudRepository;
    }
    public override Task<Guid> BeforeDeleteAsync(Guid id)
    {
        var qtd = _despesaCrudRepository.GetAll().Where( x => x.GrupoDespesaId == id).Count();
        if ( qtd > 0 ){
             throw new CrudInterceptorValidateException("Já existe lançamentos realizados para esse grupo.");
        }
        return base.BeforeDeleteAsync(id);
    }
}