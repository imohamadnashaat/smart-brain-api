import 'dotenv/config';
import http from 'http';
import app from './app.js';
import { createTables } from './models/database.js';

const PORT = process.env.PORT || 3000;
const server = http.createServer(app);

async function startServer() {
  await createTables();

  server.on('error', (error) => console.error('Server error:', error));
  server.listen(PORT, () => console.log(`Listening on PORT ${PORT}...`));
}

startServer();
