using SGAA.Api.DTOs.Solicitacoes;
using SGAA.Api.Models;

namespace SGAA.Api.Service.Interface;

public interface ISolicitacaoService
{
    Task<IEnumerable<Solicitacao>> GetMinhaSolicitacoesAsync(int usuarioId);
    Task<IEnumerable<Solicitacao>> GetTodasSolicitacoesAsync();
    Task<MetricasDto> GetMetricasAsync();
    Task<Solicitacao> CriarNovaSolicitacaoAsync(CriarSolicitacaoDto dto, int usuarioId);
    Task<bool> AtualizarStatusAsync(int solicitacaoId, string novoStatus);
    Task<bool> AvaliarSolicitacaoAsync(int solicitacaoId, int usuarioId, int nota);
}