
# Front-end - Sistema de Gestão de Atendimento Acadêmico (SGAA)

Esta pasta contém a aplicação cliente desenvolvida em React (Vite) para o projeto SGAA. Ela consome a API .NET e fornece a interface de usuário para Alunos e para a Secretaria.

### 🛠️ Stack Tecnológica

* React (com Vite)
* `react-router-dom` (para roteamento)
* `axios` (para chamadas HTTP)
* `jwt-decode` (para ler o token)
* `react-modal` (para os pop-ups)
* `react-icons` (para os ícones)
* CSS Modules (para estilização)

---

### 📋 Pré-requisitos

* [Node.js](https://nodejs.org/en) (v18 ou superior)
* `npm` (geralmente já vem com o Node.js)
* **O Back-end deve estar rodando** para que o front-end possa fazer as chamadas de API.

---

### 🚀 Instruções de Instalação e Execução

**1. Instalar Dependências**
```bash
npm install

**2. Configurar a URL da API (Crucial!)**

Abra o arquivo src/services/api.js.

Encontre a linha da baseURL.

Certifique-se de que a porta (ex: 7123) é a mesma porta https que o seu back-end está usando.

const api = axios.create({
  baseURL: 'https://localhost:7123/api' // <- Verifique esta porta!
});

**3. Executar a Aplicação**

npm run dev

A aplicação estará disponível em http://localhost:5173.