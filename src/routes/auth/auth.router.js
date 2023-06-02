import { Router } from 'express';
import { httpRegister, httpSignin } from './auth.controller.js';

const authRouter = new Router();

authRouter.post('/register', httpRegister);
authRouter.post('/signin', httpSignin);

export default authRouter;
