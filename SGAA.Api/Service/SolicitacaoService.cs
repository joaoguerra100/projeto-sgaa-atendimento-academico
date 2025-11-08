using SGAA.Api.DTOs.Solicitacoes;
using SGAA.Api.Models;
using SGAA.Api.Repository.Interface;
using SGAA.Api.Service.Interface;

namespace SGAA.Api.Service;

public class SolicitacaoService : ISolicitacaoService
{
    private readonly ISolicitacaoRepository _repository;
    private readonly ILogger<SolicitacaoService> _logger;

    public SolicitacaoService(ISolicitacaoRepository repository, ILogger<SolicitacaoService> logger)
    {
        _repository = repository;
        _logger = logger;
    }

    public async Task<Solicitacao> CriarNovaSolicitacaoAsync(CriarSolicitacaoDto dto, int usuarioId)
    {
        // Regra de negócio: Mapear o DTO para o modelo de domínio
        var novaSolicitacao = new Solicitacao
        {
            Titulo = dto.Titulo,
            Descricao = dto.Descricao,
            UsuarioId = usuarioId,
            // Regra de negócio: Definir valores padrão
            DataCriacao = DateTime.UtcNow,
            Status = "Pendente"
        };

        // Chama o repositório para persistir os dados
        await _repository.AddAsync(novaSolicitacao);

        return novaSolicitacao;
    }

    public async Task<IEnumerable<Solicitacao>> GetTodasSolicitacoesAsync()
    {
        var result = await _repository.GetAllAsync();
        return result;
    }

    public async Task<MetricasDto> GetMetricasAsync()
    {
        var result = await _repository.GetMetricasAsync();

        return result;
    }

    public async Task<IEnumerable<Solicitacao>> GetMinhaSolicitacoesAsync(int usuarioId)
    {
        var solicitacao = await _repository.GetByUsuarioIdAsync(usuarioId);

        return solicitacao;
    }

    public async Task<bool> AtualizarStatusAsync(int solicitacaoId, string novoStatus)
    {
        var solicitacao = await _repository.GetByIdAsync(solicitacaoId);
        if (solicitacao == null)
        {
            return false;
        }

        solicitacao.Status = novoStatus;
        await _repository.UpdateAsync(solicitacao);

        if (solicitacao.Aluno != null)
        {
            _logger.LogInformation(
                "SIMULAÇÃO DE E-MAIL: Enviando para {EmailDestinatario}. " +
                "Assunto: Sua solicitação '{Titulo}' foi atualizada. " +
                "Novo Status: {NovoStatus}",
                solicitacao.Aluno.Email,
                solicitacao.Titulo,
                novoStatus
            );
        }

        return true;
    }

    public async Task<bool> AvaliarSolicitacaoAsync(int solicitacaoId, int usuarioId, int nota)
    {
        var solicitacao = await _repository.GetByIdAsync(solicitacaoId);

        // Regras de Negócio:
        // 1. A solicitação existe?
        // 2. O usuário logado é o dono da solicitação?
        // 3. A solicitação está "Concluído"?
        // 4. A solicitação ainda não foi avaliada?

        if (solicitacao == null ||
         solicitacao.UsuarioId != usuarioId ||
         solicitacao.Status != "Concluído" ||
         solicitacao.Avaliacao != null)
        {
            return false;
        }

        solicitacao.Avaliacao = nota;
        await _repository.UpdateAsync(solicitacao);
        return true;
    }
}