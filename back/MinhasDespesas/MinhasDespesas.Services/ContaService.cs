using MinhasDespesas.Models.Entities;
using MinhasDespesas.Services.Interfaces;
using PtcSimpleCrud.Service.Interfaces;
using System.Runtime.CompilerServices;

[assembly: InternalsVisibleTo("MinhasDespesas.Tests")]
namespace MinhasDespesas.Services
{
    internal class ContaService : IContaService
    {
        private ICrudService<Conta> _crudService;
        private readonly IUnitOfWorkService _unitOfWorkService;

        public ContaService(
            ICrudService<Conta> crudService,
            IUnitOfWorkService unitOfWorkService
            )
        {
            _crudService = crudService;
            _unitOfWorkService = unitOfWorkService;
        }

        public async Task<Conta?> CadastraContaAsync(Conta conta)
        {
            if ( conta == null)
            {
                return null;
            }

            var ret = await _crudService.CreateAsync(conta);
            await _unitOfWorkService.CommitAsync(Guid.Empty);
            return ret;
        }

        public async Task<Conta?> DesativaContaAsync(Conta conta)
        {
            if ( conta == null)
            {
                return null;
            }

            conta.Ativa = false;
            var ret =  await _crudService.UpdateAsync(conta);
            await _unitOfWorkService.CommitAsync(Guid.Empty);
            return ret;
        }

        public async Task<bool> ExisteAsync(string email)
        {
            if ( string.IsNullOrEmpty(email))
            {
                return false;
            }
            Conta? conta = await _crudService.FirstOrDefaultAsync(x => x.Email == email);
            return conta != null;            
        }

        public async Task<Conta?> ObtemContaAsync(string email)
        {
            if (string.IsNullOrEmpty(email))
            {
                return null;
            }

            Conta? conta = await _crudService.FirstOrDefaultAsync( x => x.Email == email);
            return conta;
        }
    }
}
