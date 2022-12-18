using System.Collections.ObjectModel;
using System.Linq.Expressions;
using MinhasDespesas.Models.Entities;
using MinhasDespesas.Services;
using MinhasDespesas.Services.Interfaces;
using Moq;
using PtcSimpleCrud.Repositories.Interfaces;
using PtcSimpleCrud.Service.Interfaces;

namespace MinhasDespesas.Tests.Services;

public class ClonarPeriodoServiceTest
{
    private readonly IClonarPeriodoService _service;
    private readonly Mock<ICrudRepository<Periodo>> _periodoRepository;

    public ClonarPeriodoServiceTest()
    {
        _periodoRepository = new Mock<ICrudRepository<Periodo>>();
        _service = new ClonarPeriodoService(_periodoRepository.Object);
    }

    [Fact(DisplayName = "Clonar: 01 - Deve utilizar _periodoRepository.GetByIdAsync")]
    public async Task Clonar_01()
    {
        Guid periodoId = Guid.NewGuid();
        int mes = DateTime.Now.Month;
        int ano = DateTime.Now.Year;
        await _service.Clonar(periodoId, mes, ano);
        _periodoRepository.Verify(m => m.GetByIdAsync(periodoId), Times.Once);
    }
    
    [Fact(DisplayName = "Clonar: 02 - Se _periodoRepository.GetByIdAsync retornar null deve retornar null")]
    public async Task Clonar_02()
    {
        Guid periodoId = Guid.NewGuid();
        int mes = DateTime.Now.Month;
        int ano = DateTime.Now.Year;
        var ret = await _service.Clonar(periodoId, mes, ano);
        Assert.Null(ret);
    }
    
    [Fact(DisplayName = "Clonar: 03 - Se _periodoRepository.GetByIdAsync retornar deve executar _periodoRepository.CreateAsync")]
    public async Task Clonar_03()
    {
        Guid periodoId = Guid.NewGuid();
        int mes = DateTime.Now.Month;
        int ano = DateTime.Now.Year;
        Periodo periodo = new Periodo();
        _periodoRepository.Setup(m => m.GetByIdAsync(periodoId))
            .ReturnsAsync(periodo);
        await _service.Clonar(periodoId, mes, ano);
        _periodoRepository.Verify(m => m.CreateAsync(It.IsAny<Periodo>()), Times.Once);
    }
    
    [Fact(DisplayName = "Clonar: 04 - Validar _periodoRepository.CreateAsync mes e ano")]
    public async Task Clonar_04()
    {
        bool callbackRunning = false;
        Guid periodoId = Guid.NewGuid();
        int mes = DateTime.Now.Month;
        int ano = DateTime.Now.Year;
        Periodo periodo = new Periodo()
        {
            Valor = 10.66,
            ContaId = Guid.NewGuid()
        };
        _periodoRepository.Setup(m => m.GetByIdAsync(periodoId))
            .ReturnsAsync(periodo);
        _periodoRepository.Setup(m => m.CreateAsync(It.IsAny<Periodo>()))
            .Callback((Periodo p) =>
            {
                Assert.Equal(mes, (int)p.Mes);
                Assert.Equal(ano, (int)p.Ano);
                Assert.Equal(10.66, p.Valor);
                Assert.Equal(10.66, p.ValorFalta);

                Assert.Equal(periodo.ContaId, p.ContaId);
                callbackRunning = true;
            } );
        await _service.Clonar(periodoId, mes, ano);
        Assert.True(callbackRunning);
    }
    
    [Fact(DisplayName = "Clonar: 05 - Validar _periodoRepository.CreateAsync despesas")]
    public async Task Clonar_05()
    {
        bool callbackRunning = false;
        Guid periodoId = Guid.NewGuid();
        int mes = DateTime.Now.Month;
        int ano = DateTime.Now.Year;
        Guid grupoDespesaId01 = Guid.NewGuid();
        Guid grupoDespesaId02 = Guid.NewGuid();
        
        Periodo periodo = new Periodo()
        {
            Valor = 10.66,
            Despesas = new Collection<Despesa>
            {
                new Despesa
                {
                    Descricao = "DESC 01",
                    Valor = 1,
                    GrupoDespesaId = grupoDespesaId01
                },
                new Despesa
                {
                    Descricao = "DESC 02",
                    Valor = 2.55,
                    GrupoDespesaId = grupoDespesaId02
                },
            }
        };
        _periodoRepository.Setup(m => m.GetByIdAsync(periodoId))
            .ReturnsAsync(periodo);
        _periodoRepository.Setup(m => m.CreateAsync(It.IsAny<Periodo>()))
            .Callback((Periodo p) =>
            {
               Assert.Equal( 2, p.Despesas.Count);
               Assert.Equal("DESC 01", p.Despesas[0].Descricao);
               Assert.Equal("DESC 02", p.Despesas[1].Descricao);
               Assert.Equal(grupoDespesaId01, p.Despesas[0].GrupoDespesaId);
               Assert.Equal(grupoDespesaId02, p.Despesas[1].GrupoDespesaId);
               Assert.Equal(1, p.Despesas[0].Valor);
               Assert.Equal(2.55, p.Despesas[1].Valor);
               Assert.Equal(1, p.Despesas[0].ValorFalta);
               Assert.Equal(2.55, p.Despesas[1].ValorFalta);
                callbackRunning = true;
            } );
        await _service.Clonar(periodoId, mes, ano);
        Assert.True(callbackRunning);
    }
    
    [Fact(DisplayName = "Clonar: 06 - Deve devolver _periodoRepository.CreateAsync")]
    public async Task Clonar_06()
    {
        Guid periodoId = Guid.NewGuid();
        int mes = DateTime.Now.Month;
        int ano = DateTime.Now.Year;
        Periodo periodo = new Periodo()
        {
            Valor = 10.66,
            Despesas = new Collection<Despesa>
            {
                new Despesa
                {
                    Descricao = "DESC 01",
                    Valor = 1
                },
                new Despesa
                {
                    Descricao = "DESC 02",
                    Valor = 2.55
                },
            }
        };

        Periodo newPeriodo = new Periodo();
        _periodoRepository.Setup(m => m.GetByIdAsync(periodoId))
            .ReturnsAsync(periodo);
        _periodoRepository.Setup(m => m.CreateAsync(It.IsAny<Periodo>()))
            .ReturnsAsync(newPeriodo);
        var ret = await _service.Clonar(periodoId, mes, ano);
        Assert.Same(newPeriodo, ret);
    }
    
    
    
    
    
    
    
}