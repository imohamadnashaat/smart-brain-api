import db from '../services/db.js';

// Create users and login tables in the database
const createTables = async () => {
  try {
    await db.raw(`
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) UNIQUE NOT NULL,
        entries BIGINT DEFAULT 0,
        joined TIMESTAMP NOT NULL DEFAULT NOW()
      )
    `);

    await db.raw(`
      CREATE TABLE IF NOT EXISTS login (
        id SERIAL PRIMARY KEY,
        email VARCHAR(255) UNIQUE NOT NULL,
        hash VARCHAR(255) NOT NULL
      )
    `);

    console.log('Tables created successfully');
  } catch (err) {
    console.error('Error creating tables:', err);
  }
};

export { createTables };
