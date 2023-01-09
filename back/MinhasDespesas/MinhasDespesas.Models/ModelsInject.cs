using FluentValidation;
using Microsoft.Extensions.DependencyInjection;
using MinhasDespesas.Models.Dtos;
using MinhasDespesas.Models.Validators;

namespace MinhasDespesas.Models
{
    public static class ModelsInject
    {
        public static void AddMappers(this IServiceCollection services)
        {
            services.AddAutoMapper(typeof(MapperProfiler));
            services.AddTransient<IValidator<ContaCreateDto>, ContaCreateDtoValidator>();
        }
    }
}