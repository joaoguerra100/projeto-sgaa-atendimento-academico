using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using SGAA.Api.DTOs.Solicitacoes;
using SGAA.Api.Service.Interface;

namespace SGAA.Api.Controllers;

[ApiController]
[Route("api/[Controller]")]
[Authorize]
public class SolicitacoesController : Controller
{
    private readonly ISolicitacaoService _service;

    public SolicitacoesController(ISolicitacaoService service)
    {
        _service = service;
    }

    [HttpPost]
    public async Task<IActionResult> CriarSolicitacao(CriarSolicitacaoDto dto)
    {
        try
        {
            // Pega o ID do usuário logado a partir do token (claim "nameidentifier")
            var usuarioId = int.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier)!);

            var novaSolicitacao = await _service.CriarNovaSolicitacaoAsync(dto, usuarioId);
            return CreatedAtAction(nameof(CriarSolicitacao), new { id = novaSolicitacao.Id }, novaSolicitacao);
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

    [HttpGet("minhas")]
    public async Task<IActionResult> GetMinhasSolicitacoes()
    {
        var usuarioId = int.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier));

        if (usuarioId == 0)
        {
            return Unauthorized();
        }

        var solicitacoes = await _service.GetMinhaSolicitacoesAsync(usuarioId);

        return Ok(solicitacoes);
    }

    [HttpGet("todas")]
    [Authorize(Roles = "Secretaria")]
    public async Task<IActionResult> GetTodasSolicitacoes()
    {
        var solicitacoes = await _service.GetTodasSolicitacoesAsync();
        return Ok(solicitacoes);
    }

    [HttpGet("metricas")]
    [Authorize(Roles = "Secretaria")]
    public async Task<IActionResult> GetMetricas()
    {
        var metricas = await _service.GetMetricasAsync();
        return Ok(metricas);
    }

    [HttpPut("{id}/status")]
    [Authorize(Roles = "Secretaria")]
    public async Task<IActionResult> AtualizarStatus(int id, [FromBody] AtualizarStatusRequest request)
    {
        var sucesso = await _service.AtualizarStatusAsync(id, request.NovoStatus);
        if (!sucesso)
        {
            return NotFound(new { message = "Solicitação não encontrada." });
        }

        return Ok(new { message = "Status atualizado com sucesso." });
    }

    [HttpPut("{id}/avaliar")]
    [Authorize(Roles = "Aluno")]
    public async Task<IActionResult> AvaliarSolicitacao(int id, [FromBody] AvaliacaoRequestDto request)
    {
        var usuarioId = int.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier)!);

        var sucesso = await _service.AvaliarSolicitacaoAsync(id, usuarioId, request.Nota);

        if (!sucesso)
        {
            // Isso pode falhar se o usuário tentar avaliar duas vezes, ou uma solicitação que não é dele
            return BadRequest(new { message = "Não foi possível registrar a avaliação." });
        }

        return Ok(new { message = "Avaliação registrada com sucesso." });
    }
}