namespace MinhasDespesas.Models.Dtos;

public class GrupoDespesaDto: DtoBase
{
    public Guid GrupoDespesaId { get; set; }
    public ContaDto Conta { get; set; }
    public GrupoDespesaDto? GrupoDespesaPai { get; set; }
    public string Nome { get; set; }
    public string? Codigo { get; set; }
}