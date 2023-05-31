import knex from 'knex';
import dotenv from 'dotenv';

dotenv.config();

const db = knex({
  client: 'pg',
  connection: {
    connectionString: process.env.PG_CONNECTION_STRING,
    ssl: process.env.SSL_STATUS === 'true',
  },
});

export default db;
