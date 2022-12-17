using MinhasDespesas.Models.Entities;
using MinhasDespesas.Models.Enums;

namespace MinhasDespesas.Models.Objects
{
    public class AberturaPeriodo
    {
        public Conta Conta { get; set; }
        public Meses Mes { get; set; }
        public int Ano { get; set; }
    }
}
