import express from 'express';
import cors from 'cors';
import api from './routes/api.js';

const app = express();

app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.get('/', (req, res) => res.json({ sucess: 'ok' }));
app.use('/api', api);

export default app;
