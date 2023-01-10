namespace MinhasDespesas.Models.Filters;

public class DespesaFilter
{
    public Guid ContaId { get; set; }
    public Guid PeriodoId { get; set; }
    public Guid? GrupoDespesaId { get; set; }
    public double? Valor { get; set; }
    public double? ValorPago { get; set; }
    public double? ValorFalta { get; set; }
    public string? Descricao { get; set; }
    public bool? ApenasPagos { get; set; }
    public bool? ApenasPendentes { get; set; }
}