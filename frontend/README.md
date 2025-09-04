# TODO List - Frontend

Interface web moderna e responsiva para gerenciar tarefas, desenvolvida com React, TypeScript e Tailwind CSS.

## 🚀 Tecnologias

- **React 18** - Biblioteca JavaScript para interfaces de usuário
- **TypeScript** - Superset do JavaScript com tipagem estática
- **Vite** - Build tool ultra-rápido
- **Tailwind CSS** - Framework CSS utilitário
- **Docker** - Containerização da aplicação

## ✨ Funcionalidades

- ✅ Interface intuitiva e responsiva
- 📝 Adicionar novas tarefas
- ✔️ Marcar tarefas como concluídas
- 🎨 Design moderno com Tailwind CSS
- 📱 Totalmente responsivo

## 🛠️ Instalação e Execução
### Instalação

```bash
npm install
```

### Executar a aplicação

```bash
npm run dev

npm run build

```

A aplicação estará disponível em `http://localhost:5173`

### Com Docker

```bash
docker-compose up --build
```

## 🧪 Testes

```bash
npm run test
```

## 📁 Estrutura do Projeto

```
src/
├── api/
│   ├── config.ts              # Configuração da API
│   └── tasks.ts               # Serviços da API de tarefas
├── components/
│   ├── SearchBar.tsx          # Componente de busca
│   ├── TaskForm.tsx           # Formulário de tarefas
│   ├── TaskItem.tsx           # Item individual de tarefa
│   └── TaskList.tsx           # Lista de tarefas
├── assets/                    # Imagens e ícones
├── types.ts                   # Tipos TypeScript
├── App.tsx                    # Componente principal
└── main.tsx                   # Ponto de entrada
```

## 🔧 Configuração

### Variáveis de Ambiente

```env
VITE_API_URL=http://localhost:3001
```

## 🐳 Docker

A aplicação pode ser executada em container Docker. O `Dockerfile` está configurado para:

- Usar Node.js 18 Alpine
- Build otimizado com Vite
- Expor porta 80

## 📱 Design Responsivo

A aplicação é totalmente responsiva e funciona em:

- 📱 Dispositivos móveis
- 📱 Tablets
- 💻 Desktops

## 🎯 Scripts Disponíveis
