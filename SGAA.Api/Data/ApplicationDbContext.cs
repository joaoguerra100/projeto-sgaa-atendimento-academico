using Microsoft.EntityFrameworkCore;
using SGAA.Api.Models;

namespace SGAA.Api.Data;

public class ApplicationDbContext : DbContext
{
    protected ApplicationDbContext()
    {
    }

    public ApplicationDbContext(DbContextOptions options) : base(options)
    {
    }

    public DbSet<Usuario> Usuarios { get; set;}
    public DbSet<Solicitacao> Solicitacaos { get; set;}
}