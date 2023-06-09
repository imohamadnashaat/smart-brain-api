import { Router } from 'express';

import {
  httpGetUsersById,
  httpUpdateUser,
  httpDeleteUser,
} from './users.controller.js';
import { checkUserId } from '../../middlewares/users.middleware.js';

const usersRouter = new Router();

usersRouter.get('/:id', checkUserId, httpGetUsersById);
usersRouter.put('/:id', checkUserId, httpUpdateUser);
usersRouter.delete('/:id', checkUserId, httpDeleteUser);

export default usersRouter;
