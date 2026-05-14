# Guia de Configuração - Autenticação Full Stack

Este guia descreve como configurar e usar o sistema de autenticação completo entre o frontend (`happ-manager`) e backend (`happ-manager-api`).

## 📋 Pré-requisitos

- Node.js 16+
- npm ou yarn
- Duas janelas de terminal abertas

## 🚀 Passo 1: Configurar o Backend (API)

### 1.1 Instalar Dependências

```bash
cd happ-manager-api
npm install
```

Isso inclui:
- `jsonwebtoken` - Para gerar e validar JWTs
- `bcryptjs` - Para hash de senhas
- `dotenv` - Para variáveis de ambiente
- `cors` - Para CORS

### 1.2 Configurar Variáveis de Ambiente

O arquivo `.env` já foi criado com:

```env
DATABASE_URL=file:./dev.db
PORT=3000
JWT_SECRET=your-secret-key-change-in-production
```

⚠️ **Em Produção**: Altere o `JWT_SECRET` para uma chave segura!

### 1.3 Executar Migrations do Banco de Dados

```bash
npm run prisma:migrate:sqlite
```

Isso cria as tabelas necessárias no banco de dados.

### 1.4 Iniciar o Servidor

```bash
npm run dev
```

Você verá:
```
Server listening on http://localhost:3000
```

## 🚀 Passo 2: Configurar o Frontend

### 2.1 Instalar Dependências

```bash
cd happ-manager
npm install
```

### 2.2 Variáveis de Ambiente

O arquivo `.env` já foi criado com:

```env
VITE_API_URL=http://localhost:3000
```

## ✅ Passo 3: Testar a Autenticação

### 3.1 Teste Rápido (cURL)

**Terminal 3 (teste)**:

```bash
# 1. Criar usuário
curl -X POST http://localhost:3000/api/users \
  -H "Content-Type: application/json" \
  -d '{
    "email": "teste@exemplo.com",
    "password": "senha123",
    "name": "Teste",
    "phone": "11999999999"
  }'

# 2. Login
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "teste@exemplo.com",
    "password": "senha123"
  }'

# 3. Usar token (copie o token da resposta anterior)
curl http://localhost:3000/api/auth/me \
  -H "Authorization: Bearer TOKEN_AQUI"
```

### 3.2 Teste Automatizado

```bash
cd happ-manager-api
node test-auth.js
```

Isso executará uma suite completa de testes do sistema de autenticação.

### 3.3 Teste no Frontend

```bash
# Na pasta happ-manager
npm run dev
```

Acesse http://localhost:5173 no navegador:

1. Clique em "Login"
2. Use as credenciais de teste:
   - Email: `teste@exemplo.com`
   - Senha: `senha123`
3. Se funcionar, será redirecionado para a página inicial

## 📚 Arquitetura

### Backend (API)

```
happ-manager-api/
├── src/
│   ├── middlewares/
│   │   ├── authMiddleware.js      # JWT validation
│   │   ├── passwordMiddleware.js  # Password hashing
│   │   ├── errorHandler.js
│   │   └── notFound.js
│   ├── controllers/
│   │   ├── authController.js      # Login endpoints
│   │   ├── userController.js
│   │   └── healthController.js
│   ├── services/
│   │   └── userService.js         # Business logic
│   ├── repositories/
│   │   └── userRepository.js      # Database queries
│   ├── routes/
│   │   └── index.js               # Route definitions
│   ├── app.js                     # Express app
│   └── index.js                   # Entry point
├── prisma/
│   └── schema.prisma              # Database schema
├── .env                           # Environment variables
└── AUTHENTICATION.md              # Documentação
```

### Frontend (happ-manager)

```
happ-manager/
├── src/
│   ├── lib/
│   │   ├── api-client.ts          # Axios client
│   │   └── api-services/
│   │       ├── user-service.ts    # User API calls
│   │       ├── ...other-services
│   │       └── index.ts
│   ├── hooks/
│   │   └── use-transactions.ts    # React Query hooks
│   ├── routes/
│   │   └── login.tsx              # Login page
│   └── ...
├── .env                           # Environment variables
└── API_INTEGRATION.md             # Documentação
```

## 🔐 Fluxo de Autenticação

```
┌─────────────┐
│   Frontend  │
└──────┬──────┘
       │ 1. POST /api/auth/login
       │    (email, password)
       ↓
┌─────────────┐
│   Backend   │
├─────────────┤
│ 1. Validate │
│ 2. Hash pwd │
│ 3. Generate│
│    JWT     │
└──────┬──────┘
       │ 2. Response (token)
       ↓
┌─────────────┐
│   Frontend  │
├─────────────┤
│ Save token  │
│ in storage  │
└──────┬──────┘
       │ 3. GET /api/users
       │    + Bearer token
       ↓
┌─────────────┐
│   Backend   │
├─────────────┤
│ 1. Validate │
│    token    │
│ 2. Get user │
└──────┬──────┘
       │ 4. Response (data)
       ↓
┌─────────────┐
│   Frontend  │
│   (logged)  │
└─────────────┘
```

## 🔑 Endpoints da API

### Públicos

| Método | Endpoint | Descrição |
|--------|----------|-----------|
| POST | `/api/auth/login` | Login |
| POST | `/api/auth/logout` | Logout |
| POST | `/api/users` | Registrar novo usuário |
| GET | `/api/health` | Health check |

### Protegidos (requerem token)

| Método | Endpoint | Descrição |
|--------|----------|-----------|
| GET | `/api/auth/me` | Usuário atual |
| GET | `/api/users` | Listar usuários |
| GET | `/api/users/:id` | Obter usuário |
| PUT | `/api/users/:id` | Atualizar usuário |
| DELETE | `/api/users/:id` | Deletar usuário |

## 🛡️ Segurança

### Implementado

✅ Senhas hasheadas com bcryptjs (10 rounds)
✅ JWT com 24h de expiração
✅ Token em header Authorization
✅ CORS configurado
✅ Validação de entrada
✅ Tratamento de erros
✅ Rate limiting (recomendado adicionar)

### Recomendações para Produção

⚠️ HTTPS obrigatório
⚠️ JWT_SECRET seguro e único
⚠️ Implementar refresh tokens
⚠️ Rate limiting
⚠️ CORS restritivo
⚠️ Logging e monitoring
⚠️ Backup regular do banco

## 🐛 Troubleshooting

### Erro: "ECONNREFUSED" ao chamar a API

```
✗ A API não está rodando
→ Verifique se executou: npm run dev (na pasta happ-manager-api)
```

### Erro: "Invalid token"

```
✗ Token expirou ou foi alterado
→ Faça login novamente para obter um novo token
```

### Erro: "CORS error"

```
✗ CORS não configurado corretamente
→ Verifique se app.js tem: app.use(cors())
```

### Erro: "Email already exists"

```
✗ Email já registrado no banco
→ Use um email diferente ou delete o usuário anterior
```

### Database não inicializado

```
✗ "PrismaClientInitializationError"
→ Execute: npm run prisma:migrate:sqlite
```

## 📖 Documentação Completa

- [API_INTEGRATION.md](../happ-manager/API_INTEGRATION.md) - Integração frontend
- [AUTHENTICATION.md](./AUTHENTICATION.md) - Detalhes de autenticação
- [README.docker.md](./README.docker.md) - Deployment com Docker

## 🚀 Próximos Passos

1. **Implementar refresh tokens** - Para melhor segurança
2. **Adicionar 2FA** - Two-factor authentication
3. **Adicionar social login** - Google, GitHub, etc.
4. **Rate limiting** - Prevenir brute force
5. **Audit logging** - Log de todas as ações

## ❓ Dúvidas?

Consulte os arquivos de documentação:
- `AUTHENTICATION.md` - Sistema de autenticação
- `API_INTEGRATION.md` - Integração frontend-backend
