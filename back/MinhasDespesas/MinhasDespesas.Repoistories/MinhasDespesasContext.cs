using Microsoft.EntityFrameworkCore;
using MinhasDespesas.Models.Entities;

namespace MinhasDespesas.Repoistories;

public class MinhasDespesasContext: DbContext
{
    public DbSet<Conta> Contas { get; set; }
    public DbSet<Despesa> Despesas { get; set; }
    public DbSet<GrupoDespesa> GrupoDespesas { get; set; }
    public DbSet<Periodo> Periodos { get; set; }
    public DbSet<DespesaPagamento> DespesaPagamentos { get; set; }

    public MinhasDespesasContext(DbContextOptions<MinhasDespesasContext> options): base(options)
    {
            
    }
    //
    // public MinhasDespesasContext()
    // {
    //         
    // }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    {
        optionsBuilder.UseNpgsql(
                @"Host=localhost;Username=postgres;Password=123456;Database=MinhasDespesas");
    }
}