Prisma

Este diretório contém o schema do Prisma para o projeto `happ-manager-api`.

Passos para usar (multi-environment):

1. Copie o `.env.prisma.example` para `.env`:

   cp .env.prisma.example .env

2. Instale dependências:

   npm install

3. Desenvolvimento (SQLite)

   - O arquivo `prisma/schema.prisma` está configurado para usar SQLite por padrão. Para gerar client e aplicar o schema:

     npx prisma generate
     npx prisma migrate dev --schema=prisma/schema.prisma --name init

4. Migrations / Produção (MySQL)

   - Para trabalhar com MySQL (gerar/aplicar migrations), use o schema alternativo `prisma/schema.mysql.prisma` e a variável `DATABASE_URL_MYSQL`:

     # set DATABASE_URL_MYSQL in env or CI
     npx prisma generate --schema=prisma/schema.mysql.prisma
     npx prisma migrate dev --schema=prisma/schema.mysql.prisma --name init

5. Prisma Studio (apontará para o datasource do schema usado):

   npx prisma studio --schema=prisma/schema.prisma

Observações:
- Use SQLite localmente para rapidez e simplicidade. Use MySQL schema for migrations/production.
- Quando gerar migrations para MySQL, execute commands with `--schema=prisma/schema.mysql.prisma` and ensure `DATABASE_URL_MYSQL` is set.
