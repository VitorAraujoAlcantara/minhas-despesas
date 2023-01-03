using PtcSimpleToken.Models.Interfaces;

namespace MinhasDespesas.Models.Objects;

public class User: IUser
{
    public Guid UserId { get; set; }
    public string Name { get; set; }
    public string Email { get; set; }
    public string Password { get; set; }
    public IEnumerable<IRole> Roles { get; set; } = new List<IRole>();
}