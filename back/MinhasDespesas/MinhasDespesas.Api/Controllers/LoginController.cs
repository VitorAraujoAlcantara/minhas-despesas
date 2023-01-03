using Microsoft.AspNetCore.Mvc;
using MinhasDespesas.Models.Dtos;
using PtcSimpleToken.Models.Objects;
using PtcSimpleToken.Services.Interfaces;

namespace MinhasDespesas.Api.Controllers;

[Route("api/v1/[controller]")]
[ApiController]
public class LoginController: ControllerBase
{
    private readonly ILoginService _loginService;

    public LoginController(ILoginService loginService)
    {
        _loginService = loginService;
    }

    [HttpPost]
    public async Task<ActionResult<UserLogin>> Login(LoginDto login)
    {
        var ret = await _loginService.LoginAsync(login.Email, login.Password);
        if (ret == null)
        {
            return NotFound();
        }

        return ret;
    }
}