namespace MinhasDespesas.Models.Dtos;

public class ContaCreateDto : DtoBase
{
    public Guid? ContaId { get; set; }
    public string Codigo { get; set; }
    public string Nome { get; set; }
    public string Email { get; set; }
    public bool Ativa { get; set; }
    public string Password { get; set; }
    public string PasswordConfirm { get; set; }
}