using MinhasDespesas.Models.Enums;

namespace MinhasDespesas.Models.Dtos;

public class PeriodoCreateDto
{
    public Guid? PeriodoId { get; set; }
    public Guid ContaId { get; set; }
    public Meses Mes { get; set; }
    public int Ano { get; set; }
}