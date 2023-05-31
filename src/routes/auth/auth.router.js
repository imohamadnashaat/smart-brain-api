import { Router } from 'express';
import { handleRegister, handleSignin } from './auth.controller.js';

const authRouter = new Router();

authRouter.post('/register', handleRegister);
authRouter.post('/signin', handleSignin);

export default authRouter;
