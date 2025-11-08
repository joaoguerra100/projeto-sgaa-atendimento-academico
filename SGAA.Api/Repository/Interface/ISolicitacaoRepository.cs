using SGAA.Api.DTOs.Solicitacoes;
using SGAA.Api.Models;

namespace SGAA.Api.Repository.Interface;

public interface ISolicitacaoRepository
{
    Task<Solicitacao?> GetByIdAsync(int id);
    Task<IEnumerable<Solicitacao>> GetByUsuarioIdAsync(int usuarioId);
    Task<IEnumerable<Solicitacao>> GetAllAsync();
    Task<MetricasDto> GetMetricasAsync();
    Task AddAsync(Solicitacao solicitacao);
    Task UpdateAsync(Solicitacao solicitacao);
}