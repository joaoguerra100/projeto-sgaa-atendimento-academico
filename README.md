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
/ 
├── 📁 frontend-sgaa/ # Contém a aplicação React (Cliente) 
│ 
├── src/ 
│ 
└── README.md <-- Leia para instruções do Front-end 
│ 
└── 📁 backend-sgaa/ # Contém a aplicação .NET (API) 
├── Controllers/ 
├── Services/ 
└── README.md <-- Leia para instruções do Back-end 
│ 
└── README.md # Este arquivo que você está lendo

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