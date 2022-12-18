using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using MinhasDespesas.Models;
using MinhasDespesas.Models.Entities;
using MinhasDespesas.Models.Filters;
using MinhasDespesas.Repoistories;
using MinhasDespesas.Services.CrudFilters;
using MinhasDespesas.Services.CrudInterceptors;
using MinhasDespesas.Services.CrudService;
using MinhasDespesas.Services.Interfaces;
using PtcSimpleCrud.Service;
using PtcSimpleCrud.Service.Interfaces;

namespace MinhasDespesas.Services;

public static class ServicesInject
{
    public static void AddServices(this IServiceCollection service, IConfiguration configuration)
    {
        service.AddTransient<IGrupoDespesaCrudService, GrupoDespesaCrudService>();
        service.AddTransient<ICrudFilterService<GrupoDespesa, GrupoDespesaFilter>, GrupoDespesaFilterService>();
        service.AddCrudService<GrupoDespesa, MinhasDespesasContext>();
        service.AddCrudService<Conta, MinhasDespesasContext>();
        service.AddCrudService<Despesa, MinhasDespesasContext>();

        // PERÍODO
        // service.AddCrudService<Periodo, MinhasDespesasContext>();
        // service.AddTransient<ICrudService<Periodo>, PeriodoCrudService>();
        // service.AddTransient<IPaginationService<Periodo>, PaginationService<Periodo>>();
        service.AddCrudServiceWithouRepository<Periodo, PeriodoCrudService>();
        service.AddTransient<ICrudInterceptorService<Periodo>, PeriodoCrudInterceptorService>();
        service.AddTransient<ICrudFilterService<Periodo, PeriodoFilter>, PeriodoFilterService>();
        // service.AddTransient<ICrudService<Conta>, ContaCrudService>();
        // service.AddTransient<ICrudService<Despesa>, DespesaCrudService>();
        // service.AddTransient<ICrudService<Periodo>, PeriodoCrudService>();

        // DESPESA
        service.AddCrudServiceWithouRepository<Despesa, DespesaCrudService>();
        service.AddTransient<ICrudInterceptorService<Despesa>, DespesaCrudInterceptorService>();
        service.AddTransient<ICrudFilterService<Despesa, DespesaFilter>, DespesaFilterService>();
        
        // DESPESA PAGAMENTO
        service.AddCrudServiceWithouRepository<DespesaPagamento, DespesaPagamentoCrudService>();
        service.AddTransient<ICrudInterceptorService<DespesaPagamento>, DespesaPagamentoCrudInterceptorService>();
        service.AddTransient<ICrudFilterService<DespesaPagamento, DespesaPagamentoFilter>, DespesaPagamentoCrudFilterService>();

        service.AddTransient<IContaService, ContaService>();
        service.AddTransient<IGrupoDespesaService, GrupoDespesaService>();
        service.AddTransient<IPeriodoService, PeriodoService>();

        service.AddTransient<IClonarPeriodoService, ClonarPeriodoService>();
        
        service.PtcSimpleCrudService();

        service.AddRepositories(configuration);
        service.AddMappers();
    }
}