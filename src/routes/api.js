import { Router } from 'express';

import { verifyTokenMiddleware } from '../middlewares/auth.middleware.js';
import authRouter from './auth/auth.router.js';
import usersRouter from './users/users.router.js';
import imagesRouter from './images/images.router.js';

const api = new Router();

api.use('/auth', authRouter);
api.use('/users', usersRouter);
api.use('/images', imagesRouter);
api.get('/protected', verifyTokenMiddleware, (req, res) => {
  res.status(200).json({ message: 'ok' });
});

export default api;
