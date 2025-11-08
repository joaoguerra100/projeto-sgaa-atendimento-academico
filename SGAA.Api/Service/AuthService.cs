using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Microsoft.IdentityModel.Tokens;
using SGAA.Api.DTOs.Auth;
using SGAA.Api.Models;
using SGAA.Api.Repository.Interface;
using SGAA.Api.Service.Interface;

namespace SGAA.Api.Service;

public class AuthService : IAuthService
{
    private readonly IUsuarioRepository _repository;
    private readonly IConfiguration _configuration;

    public AuthService(IUsuarioRepository repository, IConfiguration configuration)
    {
        _repository = repository;
        _configuration = configuration;
    }

    public async Task<Usuario> RegistrarAsync(RegistrarRequestDto dto)
    {
        var usuarioExistente = await _repository.FindByEmailAsync(dto.Email!);

        if (usuarioExistente != null)
        {
            throw new Exception("Email já cadastrado.");
        }

        var novoUsuario = new Usuario
        {
            Nome = dto.Nome,
            Email = dto.Email,
            SenhaHash = BCrypt.Net.BCrypt.HashPassword(dto.Senha),
            Perfil = "Aluno"
        };

        await _repository.AddAsync(novoUsuario);
        return novoUsuario;
    }

    public async Task<string?> LoginAsync(LoginRequestDto dto)
    {
        var usuario = await _repository.FindByEmailAsync(dto.Email!);

        if (usuario == null || !BCrypt.Net.BCrypt.Verify(dto.Senha, usuario.SenhaHash))
        {
            return null; // Credenciais inválidas
        }

        // Se as credenciais estiverem corretas, GERE O TOKEN AQUI
        return GenerateJwtToken(usuario); ;
    }

    private string GenerateJwtToken(Usuario usuario)
    {
        var tokenHandler = new JwtSecurityTokenHandler();

        // Pega a chave secreta do appsettings.json
        var key = Encoding.ASCII.GetBytes(_configuration["Jwt:Key"]!);

        // Cria os "Claims" (informações que queremos guardar no token)
        var claims = new ClaimsIdentity(new[]
        {
            // Claim mais importante: o ID do usuário.
            new Claim(ClaimTypes.NameIdentifier, usuario.Id.ToString()),
            new Claim(ClaimTypes.Name, usuario.Nome),
            new Claim(ClaimTypes.Email, usuario.Email),
            new Claim("role", usuario.Perfil)
        });

        // Descreve o token que será gerado
        var tokenDescriptor = new SecurityTokenDescriptor
        {
            Subject = claims,
            // Define o tempo de expiração do token (ex: 2 horas)
            Expires = DateTime.UtcNow.AddHours(2),
            // Cria a credencial de assinatura usando a chave e o algoritmo de segurança
            SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
        };

        // Cria o token
        var token = tokenHandler.CreateToken(tokenDescriptor);

        // Retorna o token como uma string
        return tokenHandler.WriteToken(token);
    }
}