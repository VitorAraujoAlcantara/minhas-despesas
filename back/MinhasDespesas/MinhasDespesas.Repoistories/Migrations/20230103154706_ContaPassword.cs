using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace MinhasDespesas.Repoistories.Migrations
{
    /// <inheritdoc />
    public partial class ContaPassword : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Password",
                table: "Contas",
                type: "text",
                nullable: false,
                defaultValue: "");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Password",
                table: "Contas");
        }
    }
}
