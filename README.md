# ⚽ Trybe Futebol Clube - Branch Personalizada

## 📄 Descrição do Projeto

Este projeto é uma aplicação full stack baseada no gerenciamento de partidas e rankings de futebol. A API desenvolvida aqui fornece funcionalidades completas para login, visualização e registro de partidas, além de cálculos e rankings de desempenho para os times. Esta branch contém modificações personalizadas sobre o backend do projeto original, com foco em regras de negócio, integração via Docker e testes.

## 🛠 Tecnologias Utilizadas

- **Node.js** e **Express** – Servidor backend com rotas RESTful
- **TypeScript** – Tipagem estática para maior segurança
- **Sequelize** – ORM para modelagem e interação com banco MySQL
- **JWT** – Autenticação segura por token
- **bcryptjs** – Criptografia de senhas
- **Docker & Docker Compose** – Containerização completa (frontend, backend, banco)
- **Mocha, Chai, Sinon** – Testes unitários e de integração
- **MySQL** – Banco de dados relacional

## ▶️ Como Executar o Projeto

### Pré-requisitos

- Docker e Docker Compose instalados
- Node.js (v16.x recomendado)
- `npm` instalado

### 1. Clonar o repositório

```bash
git clone git@github.com:seu-usuario/seu-repositorio.git
cd seu-repositorio
```

### 2. Instalar dependências

```bash
npm install
```

### 3. Subir os containers com Docker Compose

```bash
npm run compose:up
```

Esse comando sobe os containers de **frontend**, **backend** e **banco de dados** com o Docker configurado.

### 4. Resetar o banco de dados

Após os containers estarem rodando, acesse o container do backend:

```bash
docker exec -it backend bash
npm run db:reset
```

Esse comando cria o banco, aplica as *migrations* e popula com *seeders*.

### 5. Rodar os testes (opcional)

```bash
npm run test
```

### 6. Acessar o projeto

- **Frontend:** `http://localhost:3000`
- **Backend (API):** `http://localhost:3001`

---
