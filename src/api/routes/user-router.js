import express from 'express';
import { body, param } from 'express-validator';
import { getUsers, getUser, postUser, putUser, deleteUser } from '../controllers/user-controller.js';
import { authenticateToken } from '../../middlewares/authentication.js';
import { validationErrors } from '../../middlewares/error-handlers.js';

const userRouter = express.Router();

userRouter.route('/')
  .get(getUsers)
  .post(
    body('email').trim().isEmail().normalizeEmail(),
    body('username').trim().isLength({ min: 3, max: 20 }).isAlphanumeric(),
    body('password').trim().isLength({ min: 8 }),
    body('name').trim().isLength({ min: 2, max: 50 }),
    validationErrors,
    postUser
  );

userRouter.route('/:id')
  .get(getUser)
  .put(
    authenticateToken,
    param('id').isInt({ min: 1 }),
    body('email').optional().trim().isEmail().normalizeEmail(),
    body('username').optional().trim().isLength({ min: 3, max: 20 }).isAlphanumeric(),
    body('password').optional().trim().isLength({ min: 8 }),
    body('name').optional().trim().isLength({ min: 2, max: 50 }),
    validationErrors,
    putUser
  )
  .delete(authenticateToken, param('id').isInt({ min: 1 }), validationErrors, deleteUser);

export default userRouter;