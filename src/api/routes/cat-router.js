import express from 'express';
import { body, param } from 'express-validator';
import { getCats, getCat, postCat, putCat, deleteCat } from '../controllers/cat-controller.js';
import { upload, createThumbnail } from '../../middlewares/upload.js';
import { authenticateToken } from '../../middlewares/authentication.js';
import { validationErrors } from '../../middlewares/error-handlers.js';

const catRouter = express.Router();

catRouter.route('/')
  .get(getCats)
  .post(
    authenticateToken,
    upload.single('file'),
    body('cat_name').trim().isLength({ min: 3, max: 50 }),
    body('weight').isFloat({ gt: 0 }),
    body('birthdate').isISO8601(),
    validationErrors,
    createThumbnail,
    postCat
  );


catRouter.route('/:id')
  .get(getCat)
  .put(
    authenticateToken,
    param('id').isInt({ min: 1 }),
    body('cat_name').trim().isLength({ min: 3, max: 50 }),
    body('weight').isFloat({ gt: 0 }),
    body('birthdate').optional().isISO8601(),
    validationErrors,
    putCat
  )
  .delete(authenticateToken, param('id').isInt({ min: 1 }), validationErrors, deleteCat);

export default catRouter;