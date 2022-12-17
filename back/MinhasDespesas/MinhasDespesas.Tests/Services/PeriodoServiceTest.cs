using MinhasDespesas.Models.Entities;
using MinhasDespesas.Models.Enums;
using MinhasDespesas.Models.Objects;
using MinhasDespesas.Services;
using MinhasDespesas.Services.Interfaces;
using Moq;
using PtcSimpleCrud.Service.Interfaces;

namespace MinhasDespesas.Tests.Services
{
    public class PeriodoServiceTest
    {
        private readonly IPeriodoService _service;
        private readonly Mock<ICrudService<Periodo>> _crudService;
        private readonly Mock<IUnitOfWorkService> _unitOfWorkService;

        public PeriodoServiceTest()
        {
            _crudService = new Mock<ICrudService<Periodo>>();
            _unitOfWorkService = new Mock<IUnitOfWorkService>(); ;

            _service = new PeriodoService(
                _crudService.Object,
                _unitOfWorkService.Object
                );
        }

        #region AbrirPeriodoAsync
        [Fact(DisplayName = "AbrirPeriodoAsync: 01 - Caso AberturaPeriodo for null deve retornar null")]
        public async Task AbrirPeriodoAsync_01()
        {
            AberturaPeriodo aberturaPeriodo = null;
            var ret = await _service.AbrirPeriodoAsync(aberturaPeriodo);
            Assert.Null(ret);
        }

        [Fact(DisplayName = "AbrirPeriodoAsync: 02 - Deve utilizar _crudService.CreateAsync")]
        public async Task AbrirPeriodoAsync_02()
        {
            AberturaPeriodo aberturaPeriodo = new AberturaPeriodo();
            await _service.AbrirPeriodoAsync(aberturaPeriodo);
            _crudService.Verify(m => m.CreateAsync(It.IsAny<Periodo>()), Times.Once);
        }

        [Fact(DisplayName = "AbrirPeriodoAsync: 03 - Deve validar as informações de _crudService.CreateAsync")]
        public async Task AbrirPeriodoAsync_03()
        {
            bool rodouCallback = false;
            AberturaPeriodo aberturaPeriodo = new AberturaPeriodo
            {
                Conta = new Conta(),
                Mes = Meses.Janeiro,
                Ano = 2022
            };
            _crudService.Setup(m => m.CreateAsync(It.IsAny<Periodo>()))
                .Callback((Periodo p) =>
                {
                    Assert.Same(aberturaPeriodo.Conta, p.Conta);
                    Assert.Equal(aberturaPeriodo.Mes, p.Mes);
                    Assert.Equal(aberturaPeriodo.Ano, p.Ano);
                    rodouCallback = true;
                });
            await _service.AbrirPeriodoAsync(aberturaPeriodo);
            Assert.True(rodouCallback);

        }

        [Fact(DisplayName = "AbrirPeriodoAsync: 04 - Deve retornar _crudService.CreateAsync")]
        public async Task AbrirPeriodoAsync_04()
        {
            AberturaPeriodo aberturaPeriodo = new AberturaPeriodo
            {
                Conta = new Conta(),
                Mes = Meses.Janeiro,
                Ano = 2022
            };
            Periodo periodo = new Periodo();
            _crudService.Setup(m => m.CreateAsync(It.IsAny<Periodo>()))
               .ReturnsAsync(periodo);
            var ret = await _service.AbrirPeriodoAsync(aberturaPeriodo);
            Assert.Same(periodo, ret);

        }

        [Fact(DisplayName = "AbrirPeriodoAsync: 05 - Deve utilizar  _unitOfWorkService.CommitAsync")]
        public async Task AbrirPeriodoAsync_05()
        {
            AberturaPeriodo aberturaPeriodo = new AberturaPeriodo
            {
                Conta = new Conta(),
                Mes = Meses.Janeiro,
                Ano = 2022
            };
            Periodo periodo = new Periodo();
            _crudService.Setup(m => m.CreateAsync(It.IsAny<Periodo>()))
               .ReturnsAsync(periodo);
            await _service.AbrirPeriodoAsync(aberturaPeriodo);
            _unitOfWorkService.Verify(m => m.CommitAsync(Guid.Empty), Times.Once);

        }
        #endregion

        #region ObterPeriodoPeloAnoMes
        [Fact(DisplayName = "ObterPeriodoPeloAnoMes: 01 - Deve utilizar _crudService.GetFirstOrDefaultAsync")]
        public async Task ObterPeriodoPeloAnoMes_01()
        {
            int ano = DateTime.Now.Year;
            Meses mes = (Meses)DateTime.Now.Month;

            await _service.ObterPeriodoPeloAnoMes(ano, mes);
            _crudService.Verify(m => m.FirstOrDefaultAsync(It.IsAny<System.Linq.Expressions.Expression<Func<Periodo, bool>>>()), Times.Once);
        }

        [Fact(DisplayName = "ObterPeriodoPeloAnoMes: 02 - Deve retornar _crudService.GetFirstOrDefaultAsync")]
        public async Task ObterPeriodoPeloAnoMes_02()
        {
            int ano = DateTime.Now.Year;
            Meses mes = (Meses)DateTime.Now.Month;
            Periodo? periodo = new Periodo();
            _crudService.Setup(m => m.FirstOrDefaultAsync(It.IsAny<System.Linq.Expressions.Expression<Func<Periodo, bool>>>()))
                .ReturnsAsync(periodo);
            var ret = await _service.ObterPeriodoPeloAnoMes(ano, mes);
            Assert.Same(periodo, ret);
        }
        #endregion
    }
}
