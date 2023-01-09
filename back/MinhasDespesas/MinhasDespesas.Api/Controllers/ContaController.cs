using AutoMapper;
using FluentValidation;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using MinhasDespesas.Models.Dtos;
using MinhasDespesas.Models.Entities;
using MinhasDespesas.Services.Interfaces;
using PtcSimpleToken.Services.Interfaces;

namespace MinhasDespesas.Api.Controllers;

[Route("api/v1/[controller]")]
[ApiController]
public class ContaController : ControllerBase
{
    private readonly IContaService _contaService;
    private readonly IMapper _mapper;

    public ContaController(
        IContaService contaService,
        IMapper mapper
    )
    {
        _contaService = contaService;
        _mapper = mapper;
    }

    [Authorize]
    [HttpGet("{email}")]
    public async Task<Conta?> GetConta(string email)
    {
        return await _contaService.ObtemContaAsync(email);
    }

    [HttpPost]
    public async Task<Conta?> AddConta(
        [FromServices] IValidator<ContaCreateDto> validator,
        [FromServices] IEncriptStringService encriptStringService,
        ContaCreateDto conta)
    {
        await validator.ValidateAndThrowAsync(conta);

        conta.Password = encriptStringService.GetPasswordEncripted(conta.Password);

        var _conta = _mapper.Map<Conta>(conta);
        return await _contaService.CadastraContaAsync(_conta);
    }


}