using MinhasDespesas.Models.Entities;
using MinhasDespesas.Models.Enums;

namespace MinhasDespesas.Models.Dtos;

public class PeriodoDto
{
    public Guid PeriodoId { get; set; }
    public ContaDto Conta { get; set; }
    public Guid ContaId { get; set; }
    public Meses Mes { get; set; }
    public int Ano { get; set; }
    public IList<DespesaDto> Despesas { get; set; }=new List<DespesaDto>();
    public double Valor { get; set; }
    public double ValorPago { get; set; }
    public double ValorFalta { get; set; }
}