DB schema

Este diretório contém scripts SQL para criar o schema base do `happ-manager-api`.

Como aplicar (usando Docker):

1. Copie `.env.example` para `.env` e ajuste credenciais.
2. Se você usa o `docker-compose.yml` no projeto, monte o diretório `db` em `/docker-entrypoint-initdb.d` para executar o SQL na primeira inicialização do container MySQL. Exemplo (adicionar ao serviço `db`):

   volumes:
     - db_data:/var/lib/mysql
     - ./db:/docker-entrypoint-initdb.d:ro

3. Suba o container (primeira vez ele executará os scripts):

   docker compose up -d

Ou aplique localmente com um cliente MySQL:

   mysql -u root -p < db/001_create_base_schema.sql

Recomendações:
- Em produção, use uma ferramenta de migração (Knex/Sequelize/TypeORM/Prisma) e mantenha scripts idempotentes.
- Não deixe arquivos `.env` com credenciais no repositório. Adicione `.env` ao `.gitignore`.
