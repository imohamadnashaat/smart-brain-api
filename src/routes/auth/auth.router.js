import { Router } from 'express';

import { register, login } from './auth.controller.js';

const authRouter = Router();

authRouter.post('/register', register);
authRouter.post('/signin', login);

export default authRouter;
