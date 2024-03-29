﻿// <auto-generated />
using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using MinhasDespesas.Repoistories;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

#nullable disable

namespace MinhasDespesas.Repoistories.Migrations
{
    [DbContext(typeof(MinhasDespesasContext))]
    [Migration("20221204194453_initial")]
    partial class initial
    {
        /// <inheritdoc />
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "7.0.0")
                .HasAnnotation("Relational:MaxIdentifierLength", 63);

            NpgsqlModelBuilderExtensions.UseIdentityByDefaultColumns(modelBuilder);

            modelBuilder.Entity("MinhasDespesas.Models.Entities.Conta", b =>
                {
                    b.Property<Guid>("ContaId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uuid");

                    b.Property<bool>("Ativa")
                        .HasColumnType("boolean");

                    b.Property<string>("Codigo")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<string>("Email")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<string>("Nome")
                        .IsRequired()
                        .HasColumnType("text");

                    b.HasKey("ContaId");

                    b.ToTable("Contas");
                });

            modelBuilder.Entity("MinhasDespesas.Models.Entities.Despesa", b =>
                {
                    b.Property<Guid>("DespesaId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uuid");

                    b.Property<DateTime>("DataCadastro")
                        .HasColumnType("timestamp with time zone");

                    b.Property<DateTime?>("DataQuitacao")
                        .HasColumnType("timestamp with time zone");

                    b.Property<DateTime?>("DataVencimento")
                        .HasColumnType("timestamp with time zone");

                    b.Property<string>("Descricao")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<Guid>("GrupoDespesaId")
                        .HasColumnType("uuid");

                    b.Property<Guid>("PeriodoId")
                        .HasColumnType("uuid");

                    b.Property<double>("Valor")
                        .HasColumnType("double precision");

                    b.Property<double>("ValorFalta")
                        .HasColumnType("double precision");

                    b.Property<double>("ValorPago")
                        .HasColumnType("double precision");

                    b.HasKey("DespesaId");

                    b.HasIndex("GrupoDespesaId");

                    b.HasIndex("PeriodoId");

                    b.ToTable("Despesas");
                });

            modelBuilder.Entity("MinhasDespesas.Models.Entities.GrupoDespesa", b =>
                {
                    b.Property<Guid>("GrupoDespesaId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uuid");

                    b.Property<string>("Codigo")
                        .HasColumnType("text");

                    b.Property<Guid>("ContaId")
                        .HasColumnType("uuid");

                    b.Property<Guid?>("GrupoDespesaPaiGrupoDespesaId")
                        .HasColumnType("uuid");

                    b.Property<string>("Nome")
                        .IsRequired()
                        .HasColumnType("text");

                    b.HasKey("GrupoDespesaId");

                    b.HasIndex("ContaId");

                    b.HasIndex("GrupoDespesaPaiGrupoDespesaId");

                    b.ToTable("GrupoDespesas");
                });

            modelBuilder.Entity("MinhasDespesas.Models.Entities.Periodo", b =>
                {
                    b.Property<Guid>("PeriodoId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uuid");

                    b.Property<int>("Ano")
                        .HasColumnType("integer");

                    b.Property<Guid>("ContaId")
                        .HasColumnType("uuid");

                    b.Property<int>("Mes")
                        .HasColumnType("integer");

                    b.Property<double>("Valor")
                        .HasColumnType("double precision");

                    b.Property<double>("ValorFalta")
                        .HasColumnType("double precision");

                    b.Property<double>("ValorPago")
                        .HasColumnType("double precision");

                    b.HasKey("PeriodoId");

                    b.HasIndex("ContaId");

                    b.ToTable("Periodos");
                });

            modelBuilder.Entity("MinhasDespesas.Models.Entities.Despesa", b =>
                {
                    b.HasOne("MinhasDespesas.Models.Entities.GrupoDespesa", "GrupoDespesa")
                        .WithMany()
                        .HasForeignKey("GrupoDespesaId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("MinhasDespesas.Models.Entities.Periodo", "Periodo")
                        .WithMany("Despesas")
                        .HasForeignKey("PeriodoId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("GrupoDespesa");

                    b.Navigation("Periodo");
                });

            modelBuilder.Entity("MinhasDespesas.Models.Entities.GrupoDespesa", b =>
                {
                    b.HasOne("MinhasDespesas.Models.Entities.Conta", "Conta")
                        .WithMany()
                        .HasForeignKey("ContaId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("MinhasDespesas.Models.Entities.GrupoDespesa", "GrupoDespesaPai")
                        .WithMany()
                        .HasForeignKey("GrupoDespesaPaiGrupoDespesaId");

                    b.Navigation("Conta");

                    b.Navigation("GrupoDespesaPai");
                });

            modelBuilder.Entity("MinhasDespesas.Models.Entities.Periodo", b =>
                {
                    b.HasOne("MinhasDespesas.Models.Entities.Conta", "Conta")
                        .WithMany()
                        .HasForeignKey("ContaId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Conta");
                });

            modelBuilder.Entity("MinhasDespesas.Models.Entities.Periodo", b =>
                {
                    b.Navigation("Despesas");
                });
#pragma warning restore 612, 618
        }
    }
}
