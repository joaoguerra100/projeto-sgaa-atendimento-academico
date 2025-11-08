using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace SGAA.Api.Migrations
{
    /// <inheritdoc />
    public partial class AddAvaliacaoToSolicitacao : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "Avaliacao",
                table: "Solicitacaos",
                type: "integer",
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Avaliacao",
                table: "Solicitacaos");
        }
    }
}
