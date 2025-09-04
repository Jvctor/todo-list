# TODO List - Backend API

API REST desenvolvida com NestJS para gerenciar tarefas de uma aplicação TODO List.

## 🚀 Tecnologias

- **NestJS** - Framework Node.js progressivo
- **TypeScript** - Superset do JavaScript com tipagem estática
- **Docker** - Containerização da aplicação

## 📋 Funcionalidades

- ✅ Criar nova tarefa
- 📝 Listar todas as tarefas
- ✔️ Marcar tarefa como concluída/pendente

## 🛠️ Instalação e Execução

### Pré-requisitos
- Node.js 18+
- npm ou yarn

### Instalação

```bash
$ npm install

```bash
npm run start:dev
```

A API estará disponível em `http://localhost:3001`

### Com Docker

```bash
docker-compose up --build
```

## 📚 API Endpoints

### Tarefas

| Método | Endpoint | Descrição |
|--------|----------|-----------|
| `GET` | `/tasks` | Lista todas as tarefas |
| `POST` | `/tasks` | Cria uma nova tarefa |
| `PUT` | `/tasks/:id/done` | Marca/desmarca uma tarefa como concluída |


## 🧪 Testes

```bash
npm run test

```

## 📁 Estrutura do Projeto

```
src/
├── dto/
│   └── create-task.dto.ts     # DTOs para validação
├── entities/
│   └── task.entity.ts         # Entidade Task
├── tasks.controller.ts        # Controller da API
├── tasks.module.ts           # Módulo principal
├── tasks.service.ts          # Lógica de negócio
└── main.ts                   # Ponto de entrada
```

## 🔧 Configuração

### Variáveis de Ambiente

```env
PORT=3001
```

## 🐳 Docker

A aplicação pode ser executada em container Docker. O `Dockerfile` está configurado para:

- Usar Node.js 18 Alpine
- Instalar dependências
- Expor porta 3001
