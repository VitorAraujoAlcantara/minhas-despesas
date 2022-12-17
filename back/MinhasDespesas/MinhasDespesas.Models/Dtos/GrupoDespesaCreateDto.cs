namespace MinhasDespesas.Models.Dtos;

public class GrupoDespesaCreateDto
{
    public Guid? GrupoDespesaId { get; set; }
    public Guid ContaId { get; set; }
    public Guid? GrupoDespesaPaiGrupoDespesaId { get; set; }
    public string Nome { get; set; }
    public string? Codigo { get; set; }
}