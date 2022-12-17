using MinhasDespesas.Models.Entities;
using MinhasDespesas.Models.Enums;
using MinhasDespesas.Models.Objects;
using MinhasDespesas.Services.Interfaces;
using PtcSimpleCrud.Service.Interfaces;

namespace MinhasDespesas.Services
{
    internal class PeriodoService : IPeriodoService
    {
        private readonly ICrudService<Periodo> _crudService;
        private readonly IUnitOfWorkService _unitOfWorkService;

        public PeriodoService(ICrudService<Periodo> crudService, IUnitOfWorkService unitOfWorkService)
        {
            _crudService = crudService;
            _unitOfWorkService = unitOfWorkService;
        }

        public async Task<Periodo?> AbrirPeriodoAsync(AberturaPeriodo aberturaPeriodo)
        {
            if ( aberturaPeriodo == null)
            {
                return null;
            }

            Periodo periodo = new Periodo
            {
                Ano = aberturaPeriodo.Ano,
                Mes = aberturaPeriodo.Mes,
                Conta = aberturaPeriodo.Conta,
                Valor = 0,
                ValorFalta = 0,
                ValorPago = 0
            };

            var ret = await _crudService.CreateAsync(periodo);
            await _unitOfWorkService.CommitAsync(Guid.Empty);
            return ret;
        }

        public async Task<Periodo?> ObterPeriodoPeloAnoMes(int ano, Meses mes)
        {
            var ret = await _crudService.FirstOrDefaultAsync( x => x.Ano == ano && x.Mes == mes);
            return ret;
        }
    }
}
