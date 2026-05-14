# Sistema de Autenticação - happ-manager-api

## Visão Geral

O sistema de autenticação utiliza **JWT (JSON Web Tokens)** com expiração de **24 horas**.

### Tecnologias Utilizadas

- **jsonwebtoken**: Geração e validação de JWTs
- **bcryptjs**: Hash seguro de senhas
- **dotenv**: Gerenciamento de variáveis de ambiente

## Configuração

### Variáveis de Ambiente

Adicione ao arquivo `.env`:

```env
# JWT Secret Key
JWT_SECRET=seu-chave-secreta-aqui

# Server Port
PORT=3000
```

⚠️ **IMPORTANTE**: Altere o `JWT_SECRET` em produção para uma chave segura e única!

## Fluxo de Autenticação

### 1. Registro de Usuário

**POST** `/api/users`

```json
{
  "email": "usuario@exemplo.com",
  "password": "senha123",
  "name": "Nome do Usuário",
  "phone": "11999999999"
}
```

**Resposta (201 Created)**:
```json
{
  "id": "uuid-aqui",
  "email": "usuario@exemplo.com",
  "name": "Nome do Usuário",
  "phone": "11999999999",
  "active": true,
  "createdAt": "2026-05-12T10:00:00.000Z",
  "updatedAt": "2026-05-12T10:00:00.000Z"
}
```

**Observação**: A senha é automaticamente hasheada com bcryptjs antes de ser armazenada.

### 2. Login

**POST** `/api/auth/login`

```json
{
  "email": "usuario@exemplo.com",
  "password": "senha123"
}
```

**Resposta (200 OK)**:
```json
{
  "message": "Login successful",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "uuid-aqui",
    "email": "usuario@exemplo.com",
    "name": "Nome do Usuário",
    "phone": "11999999999",
    "active": true,
    "createdAt": "2026-05-12T10:00:00.000Z",
    "updatedAt": "2026-05-12T10:00:00.000Z"
  }
}
```

**Erros**:
- `400 Bad Request`: Email ou senha não fornecidos
- `401 Unauthorized`: Email ou senha inválidos

### 3. Usar Token em Requisições

Adicione o token no header `Authorization`:

```
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

Exemplo com curl:
```bash
curl -H "Authorization: Bearer SEU_TOKEN" \
  http://localhost:3000/api/auth/me
```

### 4. Obter Usuário Atual

**GET** `/api/auth/me`

**Headers**:
```
Authorization: Bearer <token>
```

**Resposta (200 OK)**:
```json
{
  "id": "uuid-aqui",
  "email": "usuario@exemplo.com",
  "name": "Nome do Usuário",
  "phone": "11999999999",
  "active": true,
  "createdAt": "2026-05-12T10:00:00.000Z",
  "updatedAt": "2026-05-12T10:00:00.000Z"
}
```

### 5. Logout

**POST** `/api/auth/logout`

```json
{
  "message": "Logout successful"
}
```

**Observação**: No JWT, o logout é feito no frontend deletando o token do localStorage.

## Middleware de Autenticação

### `authenticateToken`

Valida se o token JWT é válido e não expirou.

**Localização**: [src/middlewares/authMiddleware.js](src/middlewares/authMiddleware.js)

**Uso em rotas protegidas**:
```javascript
router.get('/users', authenticateToken, userController.list);
```

### `hashPassword` / `comparePassword`

Gerencia o hash e validação de senhas.

**Localização**: [src/middlewares/passwordMiddleware.js](src/middlewares/passwordMiddleware.js)

## Rotas Protegidas

As seguintes rotas requerem um token JWT válido:

- `GET /api/users` - Listar usuários
- `GET /api/users/:id` - Obter usuário por ID
- `PUT /api/users/:id` - Atualizar usuário
- `DELETE /api/users/:id` - Deletar usuário
- `GET /api/auth/me` - Obter usuário atual

## Rotas Públicas

As seguintes rotas **não** requerem autenticação:

- `POST /api/auth/login` - Login
- `POST /api/users` - Criar novo usuário (registro)
- `GET /api/health` - Health check
- `POST /api/auth/logout` - Logout

## Tratamento de Erros

### 401 Unauthorized
```json
{
  "message": "Access token required"
}
```
ou
```json
{
  "message": "Invalid or expired token"
}
```

### 403 Forbidden
```json
{
  "message": "Invalid or expired token"
}
```

## Duração do Token

- **Expiração**: 24 horas
- **Formato**: JWT (JSON Web Token)
- **Algoritmo**: HS256

Após 24 horas, o usuário precisa fazer login novamente para obter um novo token.

## Segurança

✅ **Boas Práticas Implementadas**:
- Senhas hasheadas com bcryptjs (SALT_ROUNDS = 10)
- Tokens JWT com expiração definida
- Chave secreta em variáveis de ambiente
- Validação de token em todas as rotas protegidas
- Senha não retornada nas respostas da API

⚠️ **Recomendações para Produção**:
- Use HTTPS para todas as requisições
- Altere `JWT_SECRET` para uma chave forte e aleatória
- Implemente refresh tokens para melhor segurança
- Adicione rate limiting para prevenir brute force
- Use CORS adequadamente (já configurado)
- Valide e sanitize todas as entradas

## Exemplo de Teste com cURL

```bash
# 1. Criar usuário
curl -X POST http://localhost:3000/api/users \
  -H "Content-Type: application/json" \
  -d '{
    "email": "teste@exemplo.com",
    "password": "senha123",
    "name": "Usuário Teste"
  }'

# 2. Login
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "teste@exemplo.com",
    "password": "senha123"
  }'

# 3. Usar token (copie o token da resposta anterior)
curl -X GET http://localhost:3000/api/auth/me \
  -H "Authorization: Bearer TOKEN_AQUI"

# 4. Listar usuários
curl -X GET http://localhost:3000/api/users \
  -H "Authorization: Bearer TOKEN_AQUI"
```

## Integrando com o Frontend

No projeto `happ-manager`, o cliente já está configurado para usar autenticação:

1. Login e salvar token:
```typescript
const response = await userService.login(email, password)
localStorage.setItem('authToken', response.data.token)
```

2. Token é automaticamente enviado em todas as requisições:
```typescript
// apiClient inclui interceptador que adiciona o token
const { data } = await userService.getAll()
```

3. Se receber 401, redireciona para login automaticamente.

## Troubleshooting

### Erro: "Access token required"
- Verifique se o header `Authorization` foi incluído
- Verifique o formato: `Bearer TOKEN`

### Erro: "Invalid or expired token"
- O token expirou (após 24 horas)
- O token foi modificado
- A chave `JWT_SECRET` mudou

### Erro: "Invalid email or password"
- Email não existe no banco de dados
- Senha incorreta

### Erro: "User not found"
- O usuário foi deletado do banco
- O ID no token não existe
