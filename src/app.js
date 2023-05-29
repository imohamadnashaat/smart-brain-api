import express from 'express';
import bcrypt from 'bcryptjs';
import cors from 'cors';
import knex from 'knex';

import { handleRegister } from './controllers/register.controller.js';
import { handleSignin } from './controllers/signin.controller.js';
import { handleProfileGet } from './controllers/profile.controller.js';
import { handleImageGet } from './controllers/image.controller.js';
import { handleClarifaiImagePost } from './controllers/clarifai.controller.js';
import { handleUsersGet } from './controllers/users.controller.js';

const app = express();

const db = knex({
  client: 'pg',
  connection: {
    connectionString: process.env.PG_CONNECTION_STRING,
    ssl: true,
  },
});

app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.get('/', (req, res) => res.json({ sucess: 'ok' }));
app.get('/users', handleUsersGet(db));
app.post('/register', handleRegister(db, bcrypt));
app.post('/signin', handleSignin(db, bcrypt));
app.get('/profile/:id', handleProfileGet(db));
app.put('/image', handleImageGet(db));
app.post('/clarifaiImage', handleClarifaiImagePost);

export default app;
