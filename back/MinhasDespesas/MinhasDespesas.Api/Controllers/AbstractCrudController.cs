using System.Security.Claims;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using MinhasDespesas.Models.Dtos;
using PtcSimpleCrud.Models.Objects;
using PtcSimpleCrud.Service.Interfaces;

namespace MinhasDespesas.Api.Controllers;

[Route("api/v1/[controller]")]
[ApiController]
public abstract class AbstractCrudController<Entity, Dto, CreateDto> : ControllerBase
    where Dto : class
{
    protected readonly ICrudService<Entity> crudService;
    protected readonly IMapper mapper;

    protected Guid UserId
    {
        get
        {
            if (HttpContext != null && HttpContext.User.Identity is ClaimsIdentity identity)
            {
                return Guid.TryParse(identity.FindFirst(ClaimTypes.NameIdentifier).Value, out Guid _id)
                    ? _id
                    : Guid.Empty;
            }

            return Guid.Empty;
        }
    }

    protected abstract void SetKeyToEntity(Entity entity, Guid id);

    public AbstractCrudController(ICrudService<Entity> crudService, IMapper mapper)
    {
        this.crudService = crudService;
        this.mapper = mapper;
    }

    [HttpGet]
    public virtual async Task<PaginationResponse<Dto>> GetAllAsync([FromQuery] PaginatedDataQueryDto paginatedDataQuery)
    {
        var ret = await crudService.GetAllAsync(
            paginatedDataQuery.ItensPerPage,
            paginatedDataQuery.Page,
            paginatedDataQuery.Order);
        return mapper.Map<PaginationResponse<Dto>>(ret);
    }

    [HttpGet("{id}")]
    public virtual async Task<Dto> GetAsync(Guid id)
    {
        var ret = await crudService.GetByIdAsync(id);
        return mapper.Map<Dto>(ret);
    }

    [HttpPost()]
    public virtual async Task<Dto?> CreateAsync([FromServices] IUnitOfWorkService unitOfWorkService, CreateDto dto)
    {
        var ret = await crudService.CreateAsync(mapper.Map<Entity>(dto));
        await unitOfWorkService.CommitAsync(Guid.Empty);
        return mapper.Map<Dto>(ret);
    }

    [HttpPut("{id}")]
    public virtual async Task<Dto?> UpdateAsync([FromServices] IUnitOfWorkService unitOfWorkService,Guid id, CreateDto createDto)
    {
        var entity = mapper.Map<Entity>(createDto);
        if (entity == null)
        {
            return null as Dto;
        }

        SetKeyToEntity(entity, id);
        var ret = await crudService.UpdateAsync(entity);
        await unitOfWorkService.CommitAsync(Guid.Empty);
        return mapper.Map<Dto>(ret);
    }

    [HttpDelete("{id}")]
    public async Task DeleteAsync([FromServices] IUnitOfWorkService unitOfWorkService, Guid id)
    {
        await crudService.DeleteAsync(id);
        await unitOfWorkService.CommitAsync(Guid.Empty);
        if (Response != null)
        {
            Response.StatusCode = 204;
        }
    }
}