using Microsoft.EntityFrameworkCore;
using SGAA.Api.Data;
using SGAA.Api.Repository;
using SGAA.Api.Repository.Interface;
using SGAA.Api.Service;
using SGAA.Api.Service.Interface;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowReactApp",
        policy =>
        {
            policy.WithOrigins("http://localhost:5173")
                  .AllowAnyHeader()
                  .AllowAnyMethod();
        });
});

builder.Services.AddControllers();

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(options =>
{
    // 1. Define as configurações de segurança (o cadeado)
    options.AddSecurityDefinition("Bearer", new Microsoft.OpenApi.Models.OpenApiSecurityScheme
    {
        Name = "Authorization",
        Type = Microsoft.OpenApi.Models.SecuritySchemeType.ApiKey,
        Scheme = "Bearer",
        BearerFormat = "JWT",
        In = Microsoft.OpenApi.Models.ParameterLocation.Header,
        Description = "Autenticação JWT usando o esquema Bearer. \r\n\r\n Insira 'Bearer' [espaço] e então o seu token no campo abaixo.\r\n\r\nExemplo: \"Bearer 12345abcdef\""
    });

    // 2. Adiciona o requisito de segurança a todas as rotas que precisam de autorização
    options.AddSecurityRequirement(new Microsoft.OpenApi.Models.OpenApiSecurityRequirement
    {
        {
            new Microsoft.OpenApi.Models.OpenApiSecurityScheme
            {
                Reference = new Microsoft.OpenApi.Models.OpenApiReference
                {
                    Type = Microsoft.OpenApi.Models.ReferenceType.SecurityScheme,
                    Id = "Bearer"
                }
            },
            new string[] {}
        }
    });
});

builder.Services.AddAuthentication(options =>
{
    options.DefaultAuthenticateScheme = "Bearer";
    options.DefaultChallengeScheme = "Bearer";
})
.AddJwtBearer(options =>
{
    options.TokenValidationParameters = new Microsoft.IdentityModel.Tokens.TokenValidationParameters
    {
        // Validações que a API fará no token recebido
        ValidateIssuer = false, // Em produção, mude para true
        ValidateAudience = false, // Em produção, mude para true
        ValidateIssuerSigningKey = true,
        // ATENÇÃO: A chave secreta precisa ser a MESMA usada para GERAR o token
        IssuerSigningKey = new Microsoft.IdentityModel.Tokens.SymmetricSecurityKey(
            System.Text.Encoding.UTF8.GetBytes(builder.Configuration["Jwt:Key"]))
    };
});

var connectionString = builder.Configuration.GetConnectionString("ConnectionPostgres");
builder.Services.AddDbContext<ApplicationDbContext>(x => x.UseNpgsql(connectionString));

// Repositorios
builder.Services.AddScoped<ISolicitacaoRepository, SolicitacaoRepository>();
builder.Services.AddScoped<IUsuarioRepository, UsuarioRepository>();

// Serviços
builder.Services.AddScoped<ISolicitacaoService, SolicitacaoService>();
builder.Services.AddScoped<IAuthService, AuthService>();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
    app.MapOpenApi();
}

app.UseHttpsRedirection();

app.UseCors("AllowReactApp");

app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();

app.Run();