using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using MinhasDespesas.Models.Dtos;
using MinhasDespesas.Models.Entities;
using MinhasDespesas.Models.Filters;
using PtcSimpleCrud.Service.Interfaces;

namespace MinhasDespesas.Api.Controllers;

[Route("api/v1/[controller]")]
[ApiController]
public class DespesaPagamentoController: AbstractCrudFilterController<DespesaPagamento,DespesaPagamentoDto,DespesaPagamentoCreateDto,DespesaPagamentoFilter>
{
    public DespesaPagamentoController(ICrudService<DespesaPagamento> crudService, IMapper mapper, ICrudFilterService<DespesaPagamento, DespesaPagamentoFilter> crudFilterService) : base(crudService, mapper, crudFilterService)
    {
    }

    protected override void SetKeyToEntity(DespesaPagamento entity, Guid id)
    {
        entity.DespesaPagamentoId = id;
    }
}