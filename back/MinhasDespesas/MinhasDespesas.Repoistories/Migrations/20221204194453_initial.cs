using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace MinhasDespesas.Repoistories.Migrations
{
    /// <inheritdoc />
    public partial class initial : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Contas",
                columns: table => new
                {
                    ContaId = table.Column<Guid>(type: "uuid", nullable: false),
                    Codigo = table.Column<string>(type: "text", nullable: false),
                    Nome = table.Column<string>(type: "text", nullable: false),
                    Email = table.Column<string>(type: "text", nullable: false),
                    Ativa = table.Column<bool>(type: "boolean", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Contas", x => x.ContaId);
                });

            migrationBuilder.CreateTable(
                name: "GrupoDespesas",
                columns: table => new
                {
                    GrupoDespesaId = table.Column<Guid>(type: "uuid", nullable: false),
                    ContaId = table.Column<Guid>(type: "uuid", nullable: false),
                    GrupoDespesaPaiGrupoDespesaId = table.Column<Guid>(type: "uuid", nullable: true),
                    Nome = table.Column<string>(type: "text", nullable: false),
                    Codigo = table.Column<string>(type: "text", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_GrupoDespesas", x => x.GrupoDespesaId);
                    table.ForeignKey(
                        name: "FK_GrupoDespesas_Contas_ContaId",
                        column: x => x.ContaId,
                        principalTable: "Contas",
                        principalColumn: "ContaId",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_GrupoDespesas_GrupoDespesas_GrupoDespesaPaiGrupoDespesaId",
                        column: x => x.GrupoDespesaPaiGrupoDespesaId,
                        principalTable: "GrupoDespesas",
                        principalColumn: "GrupoDespesaId");
                });

            migrationBuilder.CreateTable(
                name: "Periodos",
                columns: table => new
                {
                    PeriodoId = table.Column<Guid>(type: "uuid", nullable: false),
                    ContaId = table.Column<Guid>(type: "uuid", nullable: false),
                    Mes = table.Column<int>(type: "integer", nullable: false),
                    Ano = table.Column<int>(type: "integer", nullable: false),
                    Valor = table.Column<double>(type: "double precision", nullable: false),
                    ValorPago = table.Column<double>(type: "double precision", nullable: false),
                    ValorFalta = table.Column<double>(type: "double precision", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Periodos", x => x.PeriodoId);
                    table.ForeignKey(
                        name: "FK_Periodos_Contas_ContaId",
                        column: x => x.ContaId,
                        principalTable: "Contas",
                        principalColumn: "ContaId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Despesas",
                columns: table => new
                {
                    DespesaId = table.Column<Guid>(type: "uuid", nullable: false),
                    PeriodoId = table.Column<Guid>(type: "uuid", nullable: false),
                    GrupoDespesaId = table.Column<Guid>(type: "uuid", nullable: false),
                    DataCadastro = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    DataVencimento = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    DataQuitacao = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    Descricao = table.Column<string>(type: "text", nullable: false),
                    Valor = table.Column<double>(type: "double precision", nullable: false),
                    ValorPago = table.Column<double>(type: "double precision", nullable: false),
                    ValorFalta = table.Column<double>(type: "double precision", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Despesas", x => x.DespesaId);
                    table.ForeignKey(
                        name: "FK_Despesas_GrupoDespesas_GrupoDespesaId",
                        column: x => x.GrupoDespesaId,
                        principalTable: "GrupoDespesas",
                        principalColumn: "GrupoDespesaId",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Despesas_Periodos_PeriodoId",
                        column: x => x.PeriodoId,
                        principalTable: "Periodos",
                        principalColumn: "PeriodoId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Despesas_GrupoDespesaId",
                table: "Despesas",
                column: "GrupoDespesaId");

            migrationBuilder.CreateIndex(
                name: "IX_Despesas_PeriodoId",
                table: "Despesas",
                column: "PeriodoId");

            migrationBuilder.CreateIndex(
                name: "IX_GrupoDespesas_ContaId",
                table: "GrupoDespesas",
                column: "ContaId");

            migrationBuilder.CreateIndex(
                name: "IX_GrupoDespesas_GrupoDespesaPaiGrupoDespesaId",
                table: "GrupoDespesas",
                column: "GrupoDespesaPaiGrupoDespesaId");

            migrationBuilder.CreateIndex(
                name: "IX_Periodos_ContaId",
                table: "Periodos",
                column: "ContaId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Despesas");

            migrationBuilder.DropTable(
                name: "GrupoDespesas");

            migrationBuilder.DropTable(
                name: "Periodos");

            migrationBuilder.DropTable(
                name: "Contas");
        }
    }
}
