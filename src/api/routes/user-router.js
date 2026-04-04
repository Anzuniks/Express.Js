import express from 'express';
import { getUsers, getUser, postUser, putUser, deleteUser } from '../controllers/user-controller.js';
import { authenticateToken } from '../../middlewares/authentication.js';

const userRouter = express.Router();

userRouter.route('/')
  .get(getUsers)
  .post(postUser);

userRouter.route('/:id')
  .get(getUser)
  .put(authenticateToken, putUser)
  .delete(authenticateToken, deleteUser);

export default userRouter;