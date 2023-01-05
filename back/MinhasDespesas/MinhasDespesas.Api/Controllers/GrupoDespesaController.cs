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
public class GrupoDespesaController: AbstractCrudFilterController<GrupoDespesa,GrupoDespesaDto,GrupoDespesaCreateDto,GrupoDespesaFilter>
{
    public GrupoDespesaController(ICrudService<GrupoDespesa> crudService, IMapper mapper, ICrudFilterService<GrupoDespesa, GrupoDespesaFilter> crudFilterService) : base(crudService, mapper, crudFilterService)
    {
    }

    protected override void SetKeyToEntity(GrupoDespesa entity, Guid id)
    {
        entity.GrupoDespesaId = id;
    }

    public override Task<PaginationResponse<GrupoDespesaDto>> GetAllByFilterAsync(PaginatedDataQueryDto pgData, GrupoDespesaFilter filter)
    {
        filter.ContaId = UserId;
        return base.GetAllByFilterAsync(pgData, filter);
    }

    public override Task<GrupoDespesaDto?> CreateAsync(IUnitOfWorkService unitOfWorkService, GrupoDespesaCreateDto dto)
    {
        dto.ContaId = UserId;
        return base.CreateAsync(unitOfWorkService, dto);
    }

    public override Task<PaginationResponse<GrupoDespesaDto>> GetAllAsync(PaginatedDataQueryDto paginatedDataQuery)
    {
        throw new NotImplementedException();
    }
}