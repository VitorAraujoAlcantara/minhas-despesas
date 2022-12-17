namespace MinhasDespesas.Models.Dtos;

public class DespesaPagamentoDto
{
    public Guid DespesaPagamentoId { get; set; }
    public Guid DespesaId { get; set; }
    public DespesaDto Despesa { get; set; }
    public DateTime DataPagamento { get; set; }
    public Double Valor { get; set; }
    public string? Observacao { get; set; }
}