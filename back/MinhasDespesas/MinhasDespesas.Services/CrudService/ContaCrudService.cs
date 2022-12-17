using MinhasDespesas.Models.Entities;
using PtcSimpleCrud.Repositories.Interfaces;
using PtcSimpleCrud.Service;
using PtcSimpleCrud.Service.Interfaces;

namespace MinhasDespesas.Services.CrudService
{
    internal class ContaCrudService : CrudService<Conta>
    {
        public ContaCrudService(ICrudRepository<Conta> crudRepository, IPaginationService<Conta> paginationService) : base(crudRepository, paginationService)
        {
        }
    }
}
