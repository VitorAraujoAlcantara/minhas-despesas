using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using MinhasDespesas.Models.Entities;
using PtcSimpleCrud.Repositories.Interfaces;
using PtcSimpleCrud.Repositories;

namespace MinhasDespesas.Repoistories;

public static class RepositoriesInject
{
    public static void AddRepositories(this IServiceCollection service, IConfiguration configuration)
    {
        service.AddTransient<ICrudRepository<Conta>, CrudRepository<Conta, MinhasDespesasContext> >();
        service.AddTransient<ICrudRepository<Despesa>, DespesaCrudRepository >();
        service.AddTransient<ICrudRepository<DespesaPagamento>, CrudRepository<DespesaPagamento, MinhasDespesasContext> >();
        service.AddTransient<ICrudRepository<GrupoDespesa>, GrupoDespesaCrudRepository >();
        service.AddTransient<ICrudRepository<Periodo>, PeriodoCrudRepository >();
        service.AddTransient<IUnitOfWorkRepository, UnitOfWorkRepository<MinhasDespesasContext>>();
        service.AddDbContextFactory<MinhasDespesasContext>((builder) =>
            builder.UseNpgsql(configuration.GetConnectionString("MinhasDespesas")));

    }
}