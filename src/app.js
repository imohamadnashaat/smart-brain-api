import express from 'express';
import bcrypt from 'bcryptjs';
import cors from 'cors';
import knex from 'knex';

import { handleRegister } from './controllers/register.controller.js';
import { handleSignin } from './controllers/signin.controller.js';
import { handleProfileGet } from './controllers/profile.controller.js';
import { handleImageGet } from './controllers/image.controller.js';
import { handleClarifaiImagePost } from './controllers/clarifai.controller.js';

const app = express();

const dbConfig = JSON.parse(process.env.PG_CONNECTION_STRING);
const db = knex({
  client: 'pg',
  connection: dbConfig,
});

app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.get('/', (req, res) => res.json({ sucess: 'ok' }));
app.post('/register', handleRegister(db, bcrypt));
app.post('/signin', handleSignin(db, bcrypt));
app.get('/profile/:id', handleProfileGet(db));
app.put('/image', handleImageGet(db));
app.post('/clarifaiImage', handleClarifaiImagePost);

export default app;
