require('dotenv').config();

module.exports = {
  development: {
    "username": "postgres",
    "password": "123",
    "database": "postgres",
    "host": "localhost",
    "dialect": "postgres",
    "port" : "5432"
  },
  test: {
    url: process.env.TEST_DATABASE_URL,
    dialect: 'postgres',
  },
  production: {
    url: process.env.DATABASE_URL,
    dialect: 'postgres',
  },
};