namespace MinhasDespesas.Models.Dtos;

public class DespesaPagamentoCreateDto
{
    public Guid? DespesaPagamentoId { get; set; }
    public Guid DespesaId { get; set; }
    public Double Valor { get; set; }
    public string? Observacao { get; set; }
}