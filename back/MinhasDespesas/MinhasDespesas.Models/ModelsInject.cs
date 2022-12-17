using Microsoft.Extensions.DependencyInjection;

namespace MinhasDespesas.Models
{
    public static class ModelsInject
    {
        public static void AddMappers(this IServiceCollection services)
        {
            services.AddAutoMapper(typeof(MapperProfiler));
        }
    }
}