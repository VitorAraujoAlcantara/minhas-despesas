using MinhasDespesas.Models.Entities;
using PtcSimpleCrud.Repositories.Interfaces;
using PtcSimpleCrud.Service;
using PtcSimpleCrud.Service.Interfaces;

namespace MinhasDespesas.Services.CrudService
{
    internal class PeriodoCrudService : CrudService<Periodo>
    {
        public PeriodoCrudService(
            ICrudInterceptorService<Periodo> crudInterceptor,
            ICrudRepository<Periodo> crudRepository,
            IPaginationService<Periodo> paginationService) : base(crudRepository, paginationService)
        {
            AddInterceptor(crudInterceptor);
        }
    }
}
