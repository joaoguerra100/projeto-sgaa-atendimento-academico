using System.ComponentModel.DataAnnotations;

namespace SGAA.Api.Models;

public class Usuario
{
    [Key]
    public int Id { get; set; }

    [Required]
    public string? Nome { get; set; }

    [Required]
    [EmailAddress]
    public string? Email { get; set; }

    [Required]
    public string? SenhaHash { get; set; }

    [Required]
    public string? Perfil { get; set; } //Aluno ou Secretaria
}    
