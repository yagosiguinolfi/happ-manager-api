Prisma

Este diretório contém o schema do Prisma para o projeto `happ-manager-api`.

Passos para usar:

1. Copie o `.env.prisma.example` para `.env` (ou adicione uma `DATABASE_URL` apropriada no `.env` do projeto):

   cp .env.prisma.example .env

2. Instale dependências (localmente):

   npm install

3. Gere o client do Prisma:

   npx prisma generate

4. Para aplicar o schema ao banco (desenvolvimento):

   npx prisma migrate dev --name init

   ou, para apenas sincronizar sem criar migration files:

   npx prisma db push

5. Abra o Prisma Studio para inspecionar dados:

   npx prisma studio

Observações:
- O arquivo `schema.prisma` mapeia o modelo inicial baseado no script SQL em `db/001_create_base_schema.sql`.
- Em produção, prefira criar migrations e usar ferramentas CI para aplicar mudanças com segurança.
