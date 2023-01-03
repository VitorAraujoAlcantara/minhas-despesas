using MinhasDespesas.Models.Entities;
using MinhasDespesas.Models.Objects;
using PtcSimpleCrud.Service.Interfaces;
using PtcSimpleToken.Models.Interfaces;

namespace MinhasDespesas.Services;

public class TokenUserService: PtcSimpleToken.Services.Interfaces.IUserService
{
    private readonly ICrudService<Conta> _crudService;

    public TokenUserService( ICrudService<Conta> crudService)
    {
        _crudService = crudService;
    }
    public async Task<IUser?> GetUsersByEmailAsync(string email)
    {
        var conta = await _crudService.FirstOrDefaultAsync(x => x.Email == email);
        if (conta == null)
        {
            return null;
        }

        return new User
        {
            Email = conta.Email,
            Name = conta.Nome,
            Password = conta.Password,
            UserId = conta.ContaId
        };
    }
}