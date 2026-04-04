import express from 'express';
import { getUsers, getUser, postUser, putUser, deleteUser } from '../controllers/user-controller.js';

const userRouter = express.Router();

// Tämä vastaa osoitetta /api/users
userRouter.route('/')
  .get(getUsers)
  .post(postUser);

// Tämä vastaa osoitetta /api/users/:id
userRouter.route('/:id')
  .get(getUser)
  .put(putUser)
  .delete(deleteUser);

export default userRouter;