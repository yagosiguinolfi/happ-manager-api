import fetch from 'node-fetch';

const BASE_URL = 'http://localhost:3000/api';

const colors = {
  reset: '\\x1b[0m',
  green: '\\x1b[32m',
  red: '\\x1b[31m',
  yellow: '\\x1b[33m',
  blue: '\\x1b[34m',
  gray: '\\x1b[90m',
};

const log = {
  success: (msg) => console.log(`${colors.green}✓ ${msg}${colors.reset}`),
  error: (msg) => console.log(`${colors.red}✗ ${msg}${colors.reset}`),
  info: (msg) => console.log(`${colors.blue}ℹ ${msg}${colors.reset}`),
  warning: (msg) => console.log(`${colors.yellow}⚠ ${msg}${colors.reset}`),
  debug: (msg) => console.log(`${colors.gray}${msg}${colors.reset}`),
};

async function testAuthentication() {
  console.log('\\n' + colors.blue + '=== Sistema de Autenticação - Testes ===' + colors.reset + '\\n');

  const testUser = {
    email: `test-${Date.now()}@example.com`,
    password: 'test123456',
    name: 'Usuário Teste',
    phone: '11999999999',
  };

  let token = '';

  try {
    console.log(colors.blue + '1. Criando novo usuário...' + colors.reset);
    const registerResponse = await fetch(`${BASE_URL}/users`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(testUser),
    });

    if (!registerResponse.ok) {
      throw new Error(`Erro ao criar usuário: ${registerResponse.status}`);
    }

    const newUser = await registerResponse.json();
    log.success(`Usuário criado: ${newUser.email}`);
    log.debug(`User ID: ${newUser.id}\\n`);

    console.log(colors.blue + '2. Fazendo login...' + colors.reset);
    const loginResponse = await fetch(`${BASE_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: testUser.email,
        password: testUser.password,
      }),
    });

    if (!loginResponse.ok) {
      throw new Error(`Erro ao fazer login: ${loginResponse.status}`);
    }

    const loginData = await loginResponse.json();
    token = loginData.token;
    log.success('Login realizado com sucesso');
    log.debug(`Token (primeiros 50 chars): ${token.substring(0, 50)}...\\n`);

    console.log(colors.blue + '3. Obtendo usuário atual...' + colors.reset);
    const meResponse = await fetch(`${BASE_URL}/auth/me`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });

    if (!meResponse.ok) {
      throw new Error(`Erro ao obter usuário: ${meResponse.status}`);
    }

    const currentUser = await meResponse.json();
    log.success('Usuário autenticado');
    log.debug(`Email: ${currentUser.email}`);
    log.debug(`Name: ${currentUser.name}\\n`);

    console.log(colors.blue + '=== Testes Concluídos Com Sucesso ===' + colors.reset);
    console.log(`
${colors.green}✓${colors.reset} Criação de usuário
${colors.green}✓${colors.reset} Login e geração de token
${colors.green}✓${colors.reset} Acesso a rotas protegidas com token

${colors.yellow}Dados do teste:${colors.reset}
Email: ${testUser.email}
Token: ${token.substring(0, 50)}...
    `);
  } catch (err) {
    log.error(err.message);
    console.error(err);
  }
}

testAuthentication();