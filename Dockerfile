# Etapa 1: Build - Pega a imagem do .NET 9 SDK
FROM mcr.microsoft.com/dotnet/sdk:9.0 AS build
WORKDIR /src

# Copia o arquivo de projeto (.csproj) e restaura as dependências
COPY SGAA.Api/SGAA.Api.csproj SGAA.Api/
RUN dotnet restore SGAA.Api/SGAA.Api.csproj

# Copia todo o resto do código-fonte
COPY . .

# Publica a aplicação como "self-contained" (autocontida)
# Ela vai rodar em Linux (padrão do Render) e ter o runtime embutido
WORKDIR "/src/SGAA.Api"
RUN dotnet publish SGAA.Api.csproj -c Release -o /app/publish --self-contained true -r linux-x64 /p:PublishSingleFile=true

# Etapa 2: Runtime - Pega uma imagem de "dependências" leve
# Não precisamos do runtime completo do aspnet, já que embutimos ele
FROM mcr.microsoft.com/dotnet/runtime-deps:9.0-jammy AS final
WORKDIR /app
COPY --from=build /app/publish .

# O Render vai definir a porta.
ENV ASPNETCORE_URLS=http://+:8080

# O ponto de entrada agora é o executável da aplicação, não "dotnet"
ENTRYPOINT ["./SGAA.Api"]