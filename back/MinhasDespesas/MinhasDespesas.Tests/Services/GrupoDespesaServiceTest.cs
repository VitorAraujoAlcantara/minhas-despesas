using MinhasDespesas.Models.Entities;
using MinhasDespesas.Services;
using MinhasDespesas.Services.Interfaces;
using Moq;

namespace MinhasDespesas.Tests.Services
{
    public class GrupoDespesaServiceTest
    {
        private readonly IGrupoDespesaService _service;
        private readonly Mock<IGrupoDespesaCrudService> _crudService;

        public GrupoDespesaServiceTest()
        {
            _crudService = new Mock<IGrupoDespesaCrudService>();
            _service = new GrupoDespesaService(
                _crudService.Object
            );
        }

        #region CriarNovoGrupoDespesaAsync

        [Fact(DisplayName = "CriarNovoGrupoDespesaAsync: 01 - Deve utilizar _crudService.CreateAsync")]
        public async Task CriarNovoGrupoDespesaAsync_01()
        {
            Conta conta = new Conta();
            GrupoDespesa? grupoDespesa = null;
            string nome = Guid.NewGuid().ToString();
            string codigo = Guid.NewGuid().ToString();

            await _service.CriarNovoGrupoDespesaAsync(conta, grupoDespesa, nome, codigo);
            _crudService.Verify(m => m.CreateAsync(It.IsAny<GrupoDespesa>()), Times.Once);
        }

        #endregion

        #region AtualizaGrupoDespesaAsync

        [Fact(DisplayName = "AtualizaGrupoDespesaAsync: 01 - Deve utilizar _crudService.UpdateAsync")]
        public async Task AtualizaGrupoDespesaAsync_01()
        {
            GrupoDespesa grupoDespesa = new GrupoDespesa();
            await _service.AtualizaGrupoDespesaAsync(grupoDespesa);
            _crudService.Verify(m => m.UpdateAsync(grupoDespesa), Times.Once);
        }

        #endregion

        #region ObterGruposDespesaRaizAsync

        [Fact(DisplayName =
            "ObterGruposDespesasRaizAsync: 01 - Deve utilizar _crudService.ObterGruposDespesasRaizAsync")]
        public async Task ObterGruposDespesasRaizAsync_01()
        {
            Conta conta = new Conta
            {
                ContaId = Guid.NewGuid()
            };

            await _service.ObterGruposDespesaRaizAsync(conta);
            _crudService.Verify(m => m.ObterGruposDespesasRaizAsync(conta.ContaId), Times.Once);
        }

        [Fact(DisplayName =
            "ObterGruposDespesasRaizAsync: 02 - Deve retornar _crudService.ObterGruposDespesasRaizAsync")]
        public async Task ObterGruposDespesasRaizAsync_02()
        {
            Conta conta = new Conta
            {
                ContaId = Guid.NewGuid()
            };
            IList<GrupoDespesa> list = new List<GrupoDespesa>();
            _crudService.Setup(m => m.ObterGruposDespesasRaizAsync(conta.ContaId)).ReturnsAsync(list);
            var ret = await _service.ObterGruposDespesaRaizAsync(conta);
            Assert.Same(list, ret);
        }

        [Fact(DisplayName =
            "ObterGruposDespesasRaizAsync: 03 - Deve retornar null")]
        public async Task ObterGruposDespesasRaizAsync_03()
        {
            Conta? conta = null;
            IList<GrupoDespesa> list = new List<GrupoDespesa>();
            _crudService.Setup(m => m.ObterGruposDespesasRaizAsync(It.IsAny<Guid>())).ReturnsAsync(list);
            var ret = await _service.ObterGruposDespesaRaizAsync(conta);
            Assert.Null(ret);
        }

        #endregion

        #region ObterGruposDespesaAsync

        [Fact(DisplayName = "ObterGrupoDespesaAsync: 01 - Deve utilizar _crudService.ObterGrupoDespesaAsync")]
        public async Task ObterGrupoDespesaAsync_01()
        {
            GrupoDespesa grupoDespesa = new GrupoDespesa
            {
                GrupoDespesaId = Guid.NewGuid()
            };

            await _service.ObterGruposDespesaAsync(grupoDespesa);
            _crudService.Verify(m => m.ObterGruposDespesaAsync(grupoDespesa.GrupoDespesaId), Times.Once);
        }
        
        [Fact(DisplayName = "ObterGrupoDespesaAsync: 02 - Deve retornar _crudService.ObterGrupoDespesaAsync")]
        public async Task ObterGrupoDespesaAsync_02()
        {
            GrupoDespesa grupoDespesa = new GrupoDespesa
            {
                GrupoDespesaId = Guid.NewGuid()
            };
            IList<GrupoDespesa> grupos = new List<GrupoDespesa>();
            _crudService.Setup(m => m.ObterGruposDespesaAsync(grupoDespesa.GrupoDespesaId))
                .ReturnsAsync(grupos);
            var ret = await _service.ObterGruposDespesaAsync(grupoDespesa);
            Assert.Same(grupos, ret);
        }
        
        [Fact(DisplayName = "ObterGrupoDespesaAsync: 03 - Deve retornar null")]
        public async Task ObterGrupoDespesaAsync_03()
        {
            GrupoDespesa? grupoDespesa = null;
            IList<GrupoDespesa> grupos = new List<GrupoDespesa>();
            _crudService.Setup(m => m.ObterGruposDespesaAsync(It.IsAny<Guid>()))
                .ReturnsAsync(grupos);
            var ret = await _service.ObterGruposDespesaAsync(grupoDespesa);
            Assert.Null(ret);
        }
        
        
        #endregion
    }
}