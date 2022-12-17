namespace MinhasDespesas.Models.Dtos;

public class DespesaCreateDto
{
    public Guid? DespesaId { get; set; }
    public Guid PeriodoId { get; set; }
    public Guid GrupoDespesaId { get; set; }
    public DateTime? DataVencimento { get; set; }
    public DateTime? DataQuitacao { get; set; }
    public string Descricao { get; set; }
    public double Valor { get; set; }
}