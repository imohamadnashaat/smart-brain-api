import dotenv from 'dotenv';
import http from 'http';
import app from './app.js';

dotenv.config();

const PORT = process.env.PORT || 3000;
const server = http.createServer(app);

server.on('error', (error) => console.error('Server error:', error));

server.listen(PORT, () => console.log(`Listening on PORT ${PORT}...`));
