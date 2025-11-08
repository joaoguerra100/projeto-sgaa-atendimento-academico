using SGAA.Api.DTOs.Auth;
using SGAA.Api.Models;

namespace SGAA.Api.Service.Interface;

public interface IAuthService
{
    Task<Usuario> RegistrarAsync(RegistrarRequestDto dto);
    Task<string?> LoginAsync(LoginRequestDto dto);
}