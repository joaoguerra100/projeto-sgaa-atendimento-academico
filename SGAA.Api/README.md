#  API - Sistema de Gestão de Atendimento Acadêmico (SGAA)

Esta pasta contém a API RESTful desenvolvida em .NET 8 para o projeto SGAA. Ela é responsável por toda a lógica de negócio, autenticação, gerenciamento de dados e comunicação com o banco PostgreSQL.

### 🛠️ Stack Tecnológica

* .NET 8
* Entity Framework Core 8 (para ORM)
* Npgsql (Provider do PostgreSQL)
* JWT Bearer (Para autenticação)
* BCrypt.Net (Para hashing de senhas)

---

### 📋 Pré-requisitos

* [.NET 8 SDK](https://dotnet.microsoft.com/pt-br/download/dotnet/8.0)
* Uma instância do [PostgreSQL](https://www.postgresql.org/download/) rodando (localmente ou em um container).

---

### 🚀 Instruções de Instalação e Execução

**1. Restaurar Pacotes**
```bash
dotnet restore

Com certeza! Ter bons READMEs é crucial, é o "manual de instruções" do seu projeto para o seu professor.

Aqui está o conteúdo para o seu GitHub e para os três arquivos README.md.

## 1. 🖥️ Metadados do Repositório GitHub
Nome do Repositório (Título): projeto-sgaa-atendimento-academico

Descrição (A frase que aparece abaixo do título): MVP do Sistema de Gestão de Atendimento Acadêmico (SGAA) - Projeto de TI II. Stack: React.js, .NET Web API e PostgreSQL.

## 2. 📖 README Principal (Para a Raiz do Projeto)
Crie um arquivo chamado README.md na pasta principal (a que contém as pastas frontend e backend).

Markdown

# 🎓 SGAA - Sistema de Gestão de Atendimento Acadêmico

Este é o projeto MVP (Produto Mínimo Viável) desenvolvido para a disciplina de **Projeto de TI II**, conforme o documento de planejamento. O SGAA é um sistema web completo que simula um portal de atendimento entre alunos e a secretaria acadêmica de uma instituição de ensino.

O projeto está 100% concluído e funcional, incluindo todas as funcionalidades bônus implementadas:
* Portal do Aluno (com login, cadastro, abertura de chamados e avaliação).
* Portal da Secretaria (com gerenciamento, atualização de status e modal de detalhes).
* Painel de Métricas (KPIs de atendimento).
* Autenticação e Autorização baseadas em Token (JWT).

---

### 🛠️ Stack Tecnológica

O projeto é dividido em duas aplicações independentes:

* **Front-end:** React.js (com Vite), `react-router-dom`, `axios` e `jwt-decode`.
* **Back-end:** .NET 8 Web API (C#), Entity Framework Core 8 e `BCrypt.Net`.
* **Banco de Dados:** PostgreSQL.

---

### 📂 Estrutura de Pastas

O repositório está organizado da seguinte forma:

/ ├── 📁 frontend-sgaa/ # Contém a aplicação React (Cliente) │ ├── src/ │ └── README.md <-- Leia para instruções do Front-end │ └── 📁 backend-sgaa/ # Contém a aplicação .NET (API) ├── Controllers/ ├── Services/ └── README.md <-- Leia para instruções do Back-end │ └── README.md # Este arquivo que você está lendo


---

### 🚀 Como Executar o Projeto (Quick Start)

Para executar o projeto completo, **você precisará de dois terminais abertos** (um para o Back-end e um para o Front-end).

#### 1. Back-end (Servidor)

1.  Navegue até a pasta `backend-sgaa/`.
2.  Siga as instruções detalhadas no **`backend-sgaa/README.md`** para configurar o banco de dados, aplicar as *migrations* e rodar o servidor.

#### 2. Front-end (Cliente)

1.  Em outro terminal, navegue até a pasta `frontend-sgaa/`.
2.  Siga as instruções detalhadas no **`frontend-sgaa/README.md`** para instalar as dependências, configurar a URL da API e rodar o cliente.

---

### 👨‍💻 Autor

* **João Vitor Guerra de Souza**
* **RA:** 72201585
## 3. ⚙️ README do Back-end (Para a pasta backend-sgaa)
Crie um arquivo README.md dentro da sua pasta backend-sgaa.

Markdown

#  API - Sistema de Gestão de Atendimento Acadêmico (SGAA)

Esta pasta contém a API RESTful desenvolvida em .NET 8 para o projeto SGAA. Ela é responsável por toda a lógica de negócio, autenticação, gerenciamento de dados e comunicação com o banco PostgreSQL.

### 🛠️ Stack Tecnológica

* .NET 8
* Entity Framework Core 8 (para ORM)
* Npgsql (Provider do PostgreSQL)
* JWT Bearer (Para autenticação)
* BCrypt.Net (Para hashing de senhas)

---

### 📋 Pré-requisitos

* [.NET 8 SDK](https://dotnet.microsoft.com/pt-br/download/dotnet/8.0)
* Uma instância do [PostgreSQL](https://www.postgresql.org/download/) rodando (localmente ou em um container).

---

### 🚀 Instruções de Instalação e Execução

**1. Restaurar Pacotes**

dotnet restore

**2. Configurar a Conexão (Crucial!)**

Abra o arquivo appsettings.json.

Encontre a seção ConnectionStrings.

Altere a DefaultConnection para apontar para o seu banco PostgreSQL, informando seu usuário e senha corretos.
"ConnectionStrings": {
  "DefaultConnection": "Host=localhost;Database=sgaa_db;Username=postgres;Password=SUA_SENHA_AQUI"
},
Opcional: Altere a Jwt:Key para qualquer chave secreta de sua preferência.

**3. Aplicar Migrations (Criar o Banco)**

Execute o comando abaixo no terminal. Isso irá criar automaticamente o banco de dados sgaa_db (ou o nome que você definiu) e todas as tabelas.

dotnet ef database update

**4. Criar o Usuário "Secretaria" (Obrigatório)**

Para testar o painel de admin, você precisa de um usuário com o perfil correto.

Rode a aplicação (dotnet run).

Vá até o front-end (http://localhost:5173) e cadastre um novo usuário (ex: admin@email.com).

Abra seu banco de dados, encontre a tabela Usuarios e altere manualmente a coluna Perfil desse usuário de "Aluno" para "Secretaria".

**5. Executar a Aplicação**
dotnet run

A API estará rodando. Anote a porta https (ex: https://localhost:7123) que aparece no terminal, pois você precisará dela no front-end.