using Microsoft.EntityFrameworkCore;
using SGAA.Api.Data;
using SGAA.Api.DTOs.Solicitacoes;
using SGAA.Api.Models;
using SGAA.Api.Repository.Interface;

namespace SGAA.Api.Repository;

public class SolicitacaoRepository : ISolicitacaoRepository
{
    private readonly ApplicationDbContext _context;

    public SolicitacaoRepository(ApplicationDbContext context)
    {
        _context = context;
    }

    public async Task<IEnumerable<Solicitacao>> GetAllAsync()
    {
        return await _context.Solicitacaos
                             .Include(s => s.Aluno)
                             .OrderByDescending(s => s.DataCriacao)
                             .ToListAsync();
    }

    public async Task<Solicitacao?> GetByIdAsync(int id)
    {
        return await _context.Solicitacaos
                             .Include(s => s.Aluno)
                             .FirstOrDefaultAsync(s => s.Id == id);
    }

    public async Task<IEnumerable<Solicitacao>> GetByUsuarioIdAsync(int usuarioId)
    {
        return await _context.Solicitacaos
                            .Where(s => s.UsuarioId == usuarioId)
                            .OrderByDescending(s => s.DataCriacao)
                            .ToListAsync();
    }

    public async Task<MetricasDto> GetMetricasAsync()
    {
        var avaliacoes = await _context.Solicitacaos
                                       .Where(s => s.Avaliacao != null)
                                       .Select(s => s.Avaliacao.Value)
                                       .ToListAsync();
        var metricas = new MetricasDto
        {
            TotalSolicitacoes = await _context.Solicitacaos.CountAsync(),
            Pendentes = await _context.Solicitacaos.CountAsync(s => s.Status == "Pendente"),
            EmAnalise = await _context.Solicitacaos.CountAsync(s => s.Status == "Em Análise"),
            Concluidas = await _context.Solicitacaos.CountAsync(s => s.Status == "Concluído"),

            avaliacaoMedia = avaliacoes.Any() ? avaliacoes.Average() : (double?) null
        };

        return metricas;
    }

    public async Task AddAsync(Solicitacao solicitacao)
    {
        await _context.Solicitacaos.AddAsync(solicitacao);
        await _context.SaveChangesAsync();
    }

    public async Task UpdateAsync(Solicitacao solicitacao)
    {
        _context.Solicitacaos.Update(solicitacao);
        await _context.SaveChangesAsync();
    }
}