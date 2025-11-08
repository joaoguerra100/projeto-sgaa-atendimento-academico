using System.ComponentModel.DataAnnotations;

namespace SGAA.Api.DTOs.Solicitacoes;

public class AvaliacaoRequestDto
{
    [Range(1,5)]
    public int Nota { get; set; }
}