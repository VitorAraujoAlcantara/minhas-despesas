using MinhasDespesas.Models.Enums;

namespace MinhasDespesas.Models.Entities
{
    public class Periodo
    {
        public Guid PeriodoId { get; set; }
        public Conta Conta { get; set; }
        public Guid ContaId { get; set; }
        public Meses Mes { get; set; }
        public int Ano { get; set; }
        public IList<Despesa> Despesas { get; set; }=new List<Despesa>();
        public double Valor { get; set; }
        public double ValorPago { get; set; }
        public double ValorFalta { get; set; }
    }
}
