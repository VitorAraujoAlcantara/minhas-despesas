using MinhasDespesas.Models.Entities;
using PtcSimpleCrud.Repositories.Interfaces;
using PtcSimpleCrud.Service;
using PtcSimpleCrud.Service.Interfaces;

namespace MinhasDespesas.Services.CrudService
{
    internal class DespesaCrudService : CrudService<Despesa>
    {
        public DespesaCrudService(
            ICrudInterceptorService<Despesa> crudInterceptorService,
            ICrudRepository<Despesa> crudRepository, 
            IPaginationService<Despesa> paginationService) : base(crudRepository, paginationService)
        {
            AddInterceptor(crudInterceptorService);
        }
    }
}
