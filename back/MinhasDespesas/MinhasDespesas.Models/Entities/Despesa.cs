namespace MinhasDespesas.Models.Entities
{
    public class Despesa
    {
        public Guid DespesaId { get; set; }
        public Periodo Periodo { get; set; }
        public Guid PeriodoId { get; set; }
        public GrupoDespesa GrupoDespesa { get; set; }
        public Guid GrupoDespesaId { get; set; }
        public DateTime DataCadastro { get; set; } = DateTime.SpecifyKind(DateTime.Now, DateTimeKind.Utc);
        public DateTime? DataVencimento { get; set; }
        public DateTime? DataQuitacao { get; set; }
        public string Descricao { get; set; }
        public double Valor { get; set; }
        public double ValorPago { get; set; }
        public double ValorFalta { get; set; }
        public IList<DespesaPagamento> Pagamentos { get; set; } = new List<DespesaPagamento>();
    }
}
