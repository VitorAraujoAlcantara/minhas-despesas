namespace MinhasDespesas.Models.Dtos;

public class ContaDto: DtoBase
{
    public Guid ContaId { get; set; }
    public string Codigo { get; set; }
    public string  Nome { get; set; }
    public string Email { get; set; }
    public bool Ativa { get; set; }
}