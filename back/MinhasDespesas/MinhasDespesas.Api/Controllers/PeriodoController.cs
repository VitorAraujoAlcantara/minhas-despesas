using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using MinhasDespesas.Models.Dtos;
using MinhasDespesas.Models.Entities;
using MinhasDespesas.Models.Enums;
using MinhasDespesas.Models.Filters;
using MinhasDespesas.Services.Interfaces;
using PtcSimpleCrud.Service.Interfaces;

namespace MinhasDespesas.Api.Controllers;

[ApiController]
public class PeriodoController: AbstractCrudFilterController<Periodo,PeriodoDto,PeriodoCreateDto,PeriodoFilter>
{
    public PeriodoController(
        ICrudService<Periodo> crudService, 
        IMapper mapper, 
        ICrudFilterService<Periodo, PeriodoFilter> crudFilterService) : base(crudService, mapper, crudFilterService)
    {
    }

    protected override void SetKeyToEntity(Periodo entity, Guid id)
    {
        entity.PeriodoId = id;
    }

    [Route("clonar")]
    [HttpPost]
    public async Task<PeriodoDto> Clonar(
        [FromServices] IUnitOfWorkService unitOfWorkService,
        [FromServices] IClonarPeriodoService clonarPeriodoService,
        ClonarPeriodoDto clonarPeriodoDto)
    {
        var ret =  mapper.Map<PeriodoDto>(await clonarPeriodoService.Clonar(
            clonarPeriodoDto.PeriodoId, 
            (int)clonarPeriodoDto.Mes,
            clonarPeriodoDto.Ano)
        );

        await unitOfWorkService.CommitAsync(Guid.Empty);
        return ret;
    }
}