using AutoMapper;
using MinhasDespesas.Models.Dtos;
using MinhasDespesas.Models.Entities;
using MinhasDespesas.Models.Filters;
using PtcSimpleCrud.Service.Interfaces;

namespace MinhasDespesas.Api.Controllers;

public class PeriodoController: AbstractCrudFilterController<Periodo,PeriodoDto,PeriodoCreateDto,PeriodoFilter>
{
    public PeriodoController(ICrudService<Periodo> crudService, IMapper mapper, ICrudFilterService<Periodo, PeriodoFilter> crudFilterService) : base(crudService, mapper, crudFilterService)
    {
    }

    protected override void SetKeyToEntity(Periodo entity, Guid id)
    {
        entity.PeriodoId = id;
    }
}