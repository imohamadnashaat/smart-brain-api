import { Router } from 'express';
import { handleUsersGet, handleUsersByIdGet } from './users.controller.js';

const usersRouter = new Router();

usersRouter.get('/', handleUsersGet);
usersRouter.get('/:id', handleUsersByIdGet);

export default usersRouter;
