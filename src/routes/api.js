import { Router } from 'express';
import authRouter from './auth/auth.router.js';
import usersRouter from './users/users.router.js';
import imagesRouter from './images/images.router.js';

const api = new Router();

api.use('/auth', authRouter);
api.use('/users', usersRouter);
api.use('/images', imagesRouter);

export default api;
