using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace SGAA.Api.Models;

public class Solicitacao
{
    [Key]
    public int Id { get; set; }

    [Required]
    public string? Titulo { get; set; }

    [Required]
    public string? Descricao { get; set; }

    public string? Status { get; set; } // "Pendente", "Em Análise", "Concluído"

    public DateTime DataCriacao { get; set; }

    public int UsuarioId { get; set; }
    
    public virtual Usuario? Aluno { get; set; }

    public int? Avaliacao { get; set; }
}