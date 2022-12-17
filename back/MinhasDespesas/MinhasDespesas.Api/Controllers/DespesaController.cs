using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using MinhasDespesas.Models.Dtos;
using MinhasDespesas.Models.Entities;
using MinhasDespesas.Models.Filters;
using PtcSimpleCrud.Service.Interfaces;

namespace MinhasDespesas.Api.Controllers;

[Route("api/v1/[controller]")]
[ApiController]
public class DespesaController: AbstractCrudFilterController<Despesa,DespesaDto,DespesaCreateDto,DespesaFilter>
{
    public DespesaController(ICrudService<Despesa> crudService, IMapper mapper, ICrudFilterService<Despesa, DespesaFilter> crudFilterService) : base(crudService, mapper, crudFilterService)
    {
    }

    protected override void SetKeyToEntity(Despesa entity, Guid id)
    {
        entity.DespesaId = id;
    }
}