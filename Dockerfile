# Etapa 1: Build - Pega a imagem do .NET 8 SDK
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /src

# Copia o arquivo de projeto (.csproj) e restaura as dependências
# (Isso assume que sua pasta de back-end se chama SGAA.Api)
COPY SGAA.Api/SGAA.Api.csproj SGAA.Api/
RUN dotnet restore SGAA.Api/SGAA.Api.csproj

# Copia todo o resto do código-fonte
COPY . .

# Publica a aplicação
WORKDIR "/src/SGAA.Api"
RUN dotnet publish SGAA.Api.csproj -c Release -o /app/publish

# Etapa 2: Runtime - Pega a imagem menor do ASP.NET
FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS final
WORKDIR /app
COPY --from=build /app/publish .

# O Render vai definir a porta. Dizemos ao ASP.NET para ouvir na porta 8080.
ENV ASPNETCORE_URLS=http://+:8080

# Comando para iniciar a aplicação
ENTRYPOINT ["dotnet", "SGAA.Api.dll"]