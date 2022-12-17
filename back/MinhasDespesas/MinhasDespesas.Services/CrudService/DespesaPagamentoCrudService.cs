using MinhasDespesas.Models.Entities;
using PtcSimpleCrud.Repositories.Interfaces;
using PtcSimpleCrud.Service;
using PtcSimpleCrud.Service.Interfaces;

namespace MinhasDespesas.Services.CrudService;

public class DespesaPagamentoCrudService: CrudService<DespesaPagamento>
{
    public DespesaPagamentoCrudService(
        ICrudInterceptorService<DespesaPagamento> crudInterceptorService,
        ICrudRepository<DespesaPagamento> crudRepository,
        IPaginationService<DespesaPagamento> paginationService) : base(crudRepository, paginationService)
    {
        AddInterceptor(crudInterceptorService);
    }
}