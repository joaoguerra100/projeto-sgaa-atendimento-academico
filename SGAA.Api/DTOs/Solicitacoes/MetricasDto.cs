namespace SGAA.Api.DTOs.Solicitacoes;

public class MetricasDto
{
    public int TotalSolicitacoes { get; set; }
    public int Pendentes { get; set; }
    public int EmAnalise { get; set; }
    public int Concluidas { get; set; }
    public double? avaliacaoMedia { get; set; }
}