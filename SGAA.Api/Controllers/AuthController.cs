using Microsoft.AspNetCore.Mvc;
using SGAA.Api.DTOs.Auth;
using SGAA.Api.Service.Interface;

namespace SGAA.Api.Controllers;

[ApiController]
[Route("api/[Controller]")]
public class AuthController : Controller
{
    private readonly IAuthService _service;

    public AuthController(IAuthService service)
    {
        _service = service;
    }

    [HttpPost("registrar")]
    public async Task<IActionResult> Registrar(RegistrarRequestDto dto)
    {
        try
        {
            var usuario = await _service.RegistrarAsync(dto);
            return Ok(new { message = "Usuário registrado com sucesso!" });
        }
        catch (ArgumentException ex)
        {
            return BadRequest(ex.Message);
        }
        catch (Exception ex)
        {
            return StatusCode(500, $"Erro: {ex.Message} --- DETALHES (Inner Exception): {ex.InnerException?.Message}");
        }
    }

    [HttpPost("login")]
    public async Task<IActionResult> Login(LoginRequestDto dto)
    {
        var token = await _service.LoginAsync(dto);

        if (token == null)
        {
            return Unauthorized(new { message = "Email ou senha inválidos." });
        }

        return Ok(new { token = token });
    }
}