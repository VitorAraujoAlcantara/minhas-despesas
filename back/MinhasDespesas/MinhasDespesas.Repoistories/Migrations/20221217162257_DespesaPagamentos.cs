using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace MinhasDespesas.Repoistories.Migrations
{
    /// <inheritdoc />
    public partial class DespesaPagamentos : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "DespesaPagamentos",
                columns: table => new
                {
                    DespesaPagamentoId = table.Column<Guid>(type: "uuid", nullable: false),
                    DespesaId = table.Column<Guid>(type: "uuid", nullable: false),
                    DataPagamento = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    Valor = table.Column<double>(type: "double precision", nullable: false),
                    Observacao = table.Column<string>(type: "text", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_DespesaPagamentos", x => x.DespesaPagamentoId);
                    table.ForeignKey(
                        name: "FK_DespesaPagamentos_Despesas_DespesaId",
                        column: x => x.DespesaId,
                        principalTable: "Despesas",
                        principalColumn: "DespesaId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_DespesaPagamentos_DespesaId",
                table: "DespesaPagamentos",
                column: "DespesaId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "DespesaPagamentos");
        }
    }
}
