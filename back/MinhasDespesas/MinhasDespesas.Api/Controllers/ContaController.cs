using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using MinhasDespesas.Models.Entities;
using MinhasDespesas.Services.Interfaces;
using PtcSimpleToken.Services.Interfaces;

namespace MinhasDespesas.Api.Controllers;

[Authorize]
[Route("api/v1/[controller]")]
[ApiController]
public class ContaController : ControllerBase
{
    private readonly IContaService _contaService;

    public ContaController(IContaService contaService)
    {
        _contaService = contaService;
    }

    [HttpGet("{email}")]
    public async Task<Conta?> GetConta(string email)
    {
        return await _contaService.ObtemContaAsync(email);
    }
    
    [HttpPost]
    public async Task<Conta?> AddConta([FromServices] IEncriptStringService encriptStringService, Conta conta)
    {
        conta.Password = encriptStringService.GetPasswordEncripted(conta.Password);
        return await _contaService.CadastraContaAsync(conta);
    } 
    
    
}