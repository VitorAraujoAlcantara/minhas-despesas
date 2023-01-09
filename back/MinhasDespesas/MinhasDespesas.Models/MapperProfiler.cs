using AutoMapper;
using MinhasDespesas.Models.Dtos;
using MinhasDespesas.Models.Entities;
using PtcSimpleCrud.Models.Objects;

namespace MinhasDespesas.Models;

public class MapperProfiler : Profile
{
    public MapperProfiler()
    {
        // GrupoDespesa
        CreateMap<GrupoDespesaDto, GrupoDespesa>();
        CreateMap<GrupoDespesa, GrupoDespesaDto>();
        CreateMap<GrupoDespesaCreateDto, GrupoDespesa>();
        CreateMap<PaginationResponse<GrupoDespesa>, PaginationResponse<GrupoDespesaDto>>();
        CreateMap<PaginationResponse<GrupoDespesaDto>, PaginationResponse<GrupoDespesa>>();

        // Período
        CreateMap<PeriodoDto, Periodo>();
        CreateMap<Periodo, PeriodoDto>();
        CreateMap<PeriodoCreateDto, Periodo>();
        CreateMap<PaginationResponse<Periodo>, PaginationResponse<PeriodoDto>>();
        CreateMap<PaginationResponse<PeriodoDto>, PaginationResponse<Periodo>>();

        // Despesa
        CreateMap<DespesaDto, Despesa>();
        CreateMap<Despesa, DespesaDto>();
        CreateMap<DespesaCreateDto, Despesa>();
        CreateMap<PaginationResponse<Despesa>, PaginationResponse<DespesaDto>>();
        CreateMap<PaginationResponse<DespesaDto>, PaginationResponse<Despesa>>();

        // DespesaPagamento
        CreateMap<DespesaPagamentoDto, DespesaPagamento>();
        CreateMap<DespesaPagamento, DespesaPagamentoDto>();
        CreateMap<DespesaPagamentoCreateDto, DespesaPagamento>();
        CreateMap<PaginationResponse<DespesaPagamento>, PaginationResponse<DespesaPagamentoDto>>();
        CreateMap<PaginationResponse<DespesaPagamentoDto>, PaginationResponse<DespesaPagamento>>();


        CreateMap<ContaDto, Conta>();
        CreateMap<Conta, ContaDto>();
        CreateMap<ContaCreateDto, Conta>();
    }
}