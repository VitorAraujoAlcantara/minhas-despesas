namespace MinhasDespesas.Models.Entities;

public class DespesaPagamento
{
    public Guid DespesaPagamentoId { get; set; }
    public Guid DespesaId { get; set; }
    public Despesa Despesa { get; set; }
    public DateTime DataPagamento { get; set; } = DateTime.SpecifyKind(DateTime.Now, DateTimeKind.Utc);
    public Double Valor { get; set; }
    public string? Observacao { get; set; }

}