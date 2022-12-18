using MinhasDespesas.Models.Enums;

namespace MinhasDespesas.Models.Dtos;

public class ClonarPeriodoDto
{
    public Meses Mes { get; set; }
    public int Ano { get; set; }
    public Guid PeriodoId { get; set; }
}