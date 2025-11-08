using System.ComponentModel.DataAnnotations;

namespace SGAA.Api.DTOs.Solicitacoes;

public class AtualizarStatusRequest
{
    [Required]
    public string NovoStatus { get; set; }
}