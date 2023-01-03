namespace MinhasDespesas.Models.Entities
{
    public class Conta
    {
        public Guid ContaId { get; set; }
        public string Codigo { get; set; }
        public string  Nome { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }
        public bool Ativa { get; set; }
    }
}
