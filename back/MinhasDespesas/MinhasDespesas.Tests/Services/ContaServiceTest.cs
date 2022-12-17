using MinhasDespesas.Models.Entities;
using MinhasDespesas.Services;
using MinhasDespesas.Services.Interfaces;
using Moq;
using PtcSimpleCrud.Service.Interfaces;

namespace MinhasDespesas.Tests.Services
{
    public class ContaServiceTest
    {
        private readonly IContaService _service;
        private readonly Mock<ICrudService<Conta>> _crudService;
        private readonly Mock<IUnitOfWorkService> _unitOfWorkService;

        public ContaServiceTest()
        {
            _crudService = new Mock<ICrudService<Conta>>();
            _unitOfWorkService = new Mock<IUnitOfWorkService>();
            _service = new ContaService(
                _crudService.Object,
                _unitOfWorkService.Object
                );
        }

        /**
         * Task<bool> ExisteAsync(string email);
        Task<Conta> ObtemContaAsync(string email);
        Task<Conta> CadastraContaAsync(Conta conta);
        Task<Conta> DesativaContaAsync(Conta conta);
        */

        #region Existe
        [Fact(DisplayName = "ExisteAsync: 01 - Caso email seja null deve retornar false")]
        public async Task Existe_01()
        {
            string email = null;
            var ret = await _service.ExisteAsync( email );
            Assert.False(ret);
        }

        [Fact(DisplayName = "ExisteAsync: 02 - Caso email seja vazio deve retornar false")]
        public async Task Existe_02()
        {
            string email = string.Empty;
            var ret = await _service.ExisteAsync(email);
            Assert.False(ret);
        }

        [Fact(DisplayName = "ExisteAsync: 03 - Deve utilizar _crudService.FirstOrDefaultAsync")]
        public async Task Existe_03()
        {
            string email = Guid.NewGuid().ToString();
            await _service.ExisteAsync(email);
            _crudService.Verify(m => m.FirstOrDefaultAsync(It.IsAny<System.Linq.Expressions.Expression<Func<Conta, bool>>>()), Times.Once);
        }

        [Fact(DisplayName = "ExisteAsync: 04 - Deve retornar true quando _crudService.FirstOrDefaultAsync devolver um objeto")]
        public async Task Existe_04()
        {
            string email = Guid.NewGuid().ToString();
            _crudService.Setup(m => m.FirstOrDefaultAsync(It.IsAny<System.Linq.Expressions.Expression<Func<Conta, bool>>>())).ReturnsAsync( 
                new Conta()
                );
           var ret =  await _service.ExisteAsync(email);
            Assert.True(ret);            
        }

        [Fact(DisplayName = "ExisteAsync: 05 - Deve retornar false quando _crudService.FirstOrDefaultAsync devolver null")]
        public async Task Existe_05()
        {
            string email = Guid.NewGuid().ToString();
            _crudService.Setup(m => m.FirstOrDefaultAsync(It.IsAny<System.Linq.Expressions.Expression<Func<Conta, bool>>>())).ReturnsAsync(
                new Conta()
                );
            var ret = await _service.ExisteAsync(email);
            Assert.True(ret);
        }


        #endregion

        #region ObtemConta
        [Fact(DisplayName = "ObtemContaAsync: 01 - Se email for null deve retornar null")]
        public async Task ObtemContaAsync_01()
        {
            string email = null;
            var ret = await _service.ObtemContaAsync(email);
            Assert.Null(ret);
        }

        [Fact(DisplayName = "ObtemContaAsync: 02 - Se email for vazio deve retornar null")]
        public async Task ObtemContaAsync_02()
        {
            string email = string.Empty;
            var ret = await _service.ObtemContaAsync(email);
            Assert.Null(ret);
        }

        [Fact(DisplayName = "ObtemContaAsync: 03 - Deve utilizar crudService.FirstOrDefaultAsync")]
        public async Task ObtemContaAsync_03()
        {
            string email = Guid.NewGuid().ToString();
            await _service.ObtemContaAsync(email);
            _crudService.Verify(m => m.FirstOrDefaultAsync(It.IsAny<System.Linq.Expressions.Expression<Func<Conta, bool>>>()), Times.Once);
        }

        [Fact(DisplayName = "ObtemContaAsync: 04 - Deve retornar crudService.FirstOrDefaultAsync")]
        public async Task ObtemContaAsync_04()
        {
            string email = Guid.NewGuid().ToString();
            Conta conta = new Conta();
            _crudService.Setup(m => m.FirstOrDefaultAsync(It.IsAny<System.Linq.Expressions.Expression<Func<Conta, bool>>>()))
                .ReturnsAsync(conta);
            var ret  = await _service.ObtemContaAsync(email);
            Assert.Same(conta, ret);
            
        }
        #endregion

        #region CadastraContaAsync
        [Fact(DisplayName = "CadastraContaAsync: 01 - Se conta for null deve retornar null")]
        public async Task CadastraContaAsync_01()
        {
            Conta conta = null;
            var ret = await _service.CadastraContaAsync(conta);
            Assert.Null(ret);
        }

        [Fact(DisplayName = "CadastraContaAsync: 02 - Deve utilizar _crudService.CreateAsync")]
        public async Task CadastraContaAsync_02()
        {
            Conta conta = new Conta();
            await _service.CadastraContaAsync(conta);
            _crudService.Verify( m => m.CreateAsync(conta), Times.Once);
        }

        [Fact(DisplayName = "CadastraContaAsync: 03 - Deve retornar _crudService.CreateAsync")]
        public async Task CadastraContaAsync_03()
        {
            Conta conta = new Conta();
            Conta retConta = new Conta();
            _crudService.Setup(m => m.CreateAsync(conta)).ReturnsAsync(retConta);
            var ret = await _service.CadastraContaAsync(conta);
            Assert.Same(retConta, ret);
            
        }

        [Fact(DisplayName = "CadastraContaAsync: 04 - Deve utilizar _unitOfWorkService.CommitAsync")]
        public async Task CadastraContaAsync_04()
        {
            Conta conta = new Conta();
            Conta retConta = new Conta();
            _crudService.Setup(m => m.CreateAsync(conta)).ReturnsAsync(retConta);
            var ret = await _service.CadastraContaAsync(conta);
           _unitOfWorkService.Verify( m => m.CommitAsync(Guid.Empty), Times.Once); 

        }
        #endregion

        #region DesativaContaAsync
        [Fact(DisplayName = "DesativaContaAsync: 01 - Se conta for null deve retornar null")]
        public async Task DesativaContaAsync_01()
        {
            Conta conta = null;
            var ret = await _service.DesativaContaAsync(conta);
            Assert.Null(ret);
        }

        [Fact(DisplayName = "DesativaContaAsync: 02 - Deve utilizar _crudService.UpdateAsync")]
        public async Task DesativaContaAsync_02()
        {
            Conta conta = new Conta();
            await _service.DesativaContaAsync(conta);
            _crudService.Verify( m => m.UpdateAsync(conta), Times.Once);  
        }

        [Fact(DisplayName = "DesativaContaAsync: 03 - Deve retornar _crudService.UpdateAsync")]
        public async Task DesativaContaAsync_03()
        {
            Conta conta = new Conta();
            Conta retConta = new Conta();
            _crudService.Setup(m => m.UpdateAsync(conta)).ReturnsAsync(retConta);
            var ret = await _service.DesativaContaAsync(conta);
            Assert.Same(retConta, ret);
            
        }

        [Fact(DisplayName = "DesativaContaAsync: 04 - Deve marcar conta como desativada")]
        public async Task DesativaContaAsync_04()
        {
            bool rodouCalback = false;
            Conta conta = new Conta();
            Conta retConta = new Conta();
            _crudService.Setup(m => m.UpdateAsync(conta))
                .ReturnsAsync(retConta)
                .Callback((Conta c) =>
                {
                    Assert.False(c.Ativa);
                    rodouCalback = true;
                });
            await _service.DesativaContaAsync(conta);
            Assert.True(rodouCalback);
        }

        [Fact(DisplayName = "DesativaContaAsync: 05 - Deve utilizar _unitOfWorkService.CommitAsync")]
        public async Task DesativaContaAsync_05()
        {            
            Conta conta = new Conta();
            Conta retConta = new Conta();
            _crudService.Setup(m => m.UpdateAsync(conta))
                .ReturnsAsync(retConta);
                
            await _service.DesativaContaAsync(conta);
            _unitOfWorkService.Verify(m => m.CommitAsync(Guid.Empty), Times.Once);
        }
        #endregion
    }
}
