using SGAA.Api.Models;

namespace SGAA.Api.Repository.Interface;

public interface IUsuarioRepository
{
    Task<Usuario?> FindByEmailAsync(string email);
    Task AddAsync(Usuario usuario);
}