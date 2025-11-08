using System.ComponentModel.DataAnnotations;

namespace SGAA.Api.DTOs.Solicitacoes;

public class CriarSolicitacaoDto
{
    [Required]
    public string? Titulo { get; set; }

    [Required]
    public string? Descricao { get; set; }
}