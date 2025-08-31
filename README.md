# Todo List - Fullstack Application

Este projeto é uma aplicação fullstack composta por um backend em NestJS (Node js) e um frontend em React + Vite.

## Estrutura do Projeto

```
todo-list/
  backend/    # API NestJS
  frontend/   # Aplicação React
  docker-compose.yml
```

## Como rodar com Docker Compose

1. Certifique-se de ter o Docker e o Docker Compose instalados.
2. No terminal, execute:

```sh
docker-compose up --build
```

- O backend estará disponível em [http://localhost:3001](http://localhost:3001)
- O frontend estará disponível em [http://localhost:5173](http://localhost:5173)

## Scripts úteis

### Backend
- `npm run start:dev` — inicia o servidor NestJS em modo desenvolvimento
- `npm run test` — executa os testes unitários

### Frontend

- `npm run dev` — inicia o Vite em modo desenvolvimento
- `npm run build` — gera a build de produção

## Tecnologias

- **Backend:** NestJS(Nodejs), TypeScript
- **Frontend:** React, Vite, TypeScript
- **Containerização:** Docker, Docker Compose