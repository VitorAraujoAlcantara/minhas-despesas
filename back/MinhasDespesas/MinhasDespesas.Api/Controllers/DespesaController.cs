using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using MinhasDespesas.Models.Dtos;
using MinhasDespesas.Models.Entities;
using MinhasDespesas.Models.Filters;
using PtcSimpleCrud.Models.Objects;
using PtcSimpleCrud.Service.Interfaces;

namespace MinhasDespesas.Api.Controllers;

[Authorize]
[Route("api/v1/[controller]")]
[ApiController]
public class DespesaController : AbstractCrudFilterController<Despesa, DespesaDto, DespesaCreateDto, DespesaFilter>
{
    public DespesaController(ICrudService<Despesa> crudService, IMapper mapper, ICrudFilterService<Despesa, DespesaFilter> crudFilterService) : base(crudService, mapper, crudFilterService)
    {
    }

    protected override void SetKeyToEntity(Despesa entity, Guid id)
    {
        entity.DespesaId = id;
    }

    public override Task<PaginationResponse<DespesaDto>> GetAllByFilterAsync([FromQuery] PaginatedDataQueryDto pgData, [FromQuery] DespesaFilter filter)
    {
        filter.ContaId = UserId;
        return base.GetAllByFilterAsync(pgData, filter);
    }
}