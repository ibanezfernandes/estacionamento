# backend-apus-description

Projeto do backend da iniciativa Apus Analytics e ForJobs, feito em Node Js utilizando o Sequelize-CLI como ORM.

# how to configure in the first time open the project

npm install

# config database url via .env

copiar o .env.example e renomear para .env e registrar as urls para conexão com o banco.

# modelo padrão de configuração UR

DEV_DATABASE_URL=(dialect)://(usuario):(senha)@(host):(port)/(database-name)

# configuração manual sem utilizar URL
configurar em ./database/config/config.js.
- HOST
- PORT
- USER
- PASSWORD
- DB

# start nodemon server

npm run start-dev

# registrar Roles no banco de dados

sequelize db:seed:all