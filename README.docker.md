Docker Compose

Esse arquivo descreve como subir um banco MySQL para desenvolvimento usando Docker Compose no projeto `happ-manager-api`.

Passos rápidos (Windows PowerShell):

1. Copie o exemplo de variáveis de ambiente:

   cp .env.example .env

2. Edite `.env` e defina senhas seguras.

3. Subir o container:

   docker compose up -d

4. Verificar status do serviço:

   docker compose ps

5. Logs do container:

   docker compose logs -f db

6. Parar e remover:

   docker compose down -v

String de conexão de exemplo (Node.js / Sequelize / TypeORM):

mysql://<MYSQL_USER>:<MYSQL_PASSWORD>@127.0.0.1:<MYSQL_PORT>/<MYSQL_DATABASE>

Notas:
- O volume `db_data` persiste os dados entre reinícios.
- Para produção, não use senhas em texto claro ou o `mysql:8.0` sem configurações adicionais.
