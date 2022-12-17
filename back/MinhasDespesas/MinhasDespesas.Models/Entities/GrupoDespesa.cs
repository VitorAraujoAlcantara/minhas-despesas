namespace MinhasDespesas.Models.Entities
{
    public class GrupoDespesa
    {
        public Guid GrupoDespesaId { get; set; }
        public Conta Conta { get; set; }
        public Guid ContaId { get; set; }
        public GrupoDespesa? GrupoDespesaPai { get; set; }
        public Guid? GrupoDespesaPaiGrupoDespesaId { get; set; }
        public string Nome { get; set; }
        public string? Codigo { get; set; }
    }
}
