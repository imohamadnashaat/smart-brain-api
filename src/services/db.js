import 'dotenv/config';
import knex from 'knex';

const dbConfig = {
  client: 'pg',
  connection: {
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    database: process.env.DB_DATABASE,
  },
};

const db = knex(dbConfig);

export default db;
