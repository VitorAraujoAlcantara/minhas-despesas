using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using MinhasDespesas.Models.Dtos;
using PtcSimpleCrud.Models.Objects;
using PtcSimpleCrud.Service.Interfaces;

namespace MinhasDespesas.Api.Controllers;

public abstract class AbstractCrudFilterController<Entity, Dto, CreateDto, Filter> : AbstractCrudController<Entity, Dto, CreateDto>
    where Dto : class
{
    private readonly ICrudFilterService<Entity, Filter> crudFilterService;

    protected AbstractCrudFilterController(
        ICrudService<Entity> crudService,
        IMapper mapper,
        ICrudFilterService<Entity, Filter> crudFilterService
    ) : base(crudService, mapper)
    {
        this.crudFilterService = crudFilterService;
    }

    [HttpGet("filter")]
    public virtual async Task<PaginationResponse<Dto>> GetAllByFilterAsync([FromQuery] PaginatedDataQueryDto pgData, [FromQuery] Filter filter)
    {
        var ret = await crudService.GetAllByFilterAsync(
            pgData.ItensPerPage,
            pgData.Page,
            pgData.Order,
            filter,
            crudFilterService
        );
        var dto = mapper.Map<PaginationResponse<Dto>>(ret);
        return dto;

    }
}