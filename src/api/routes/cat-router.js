import express from 'express';
import { getCats, getCat, postCat, putCat, deleteCat } from '../controllers/cat-controller.js';
// Huom! Polku middlewareen on kaksi tasoa ylöspäin
import { createThumbnail } from '../../middlewares/upload.js';
import { authenticateToken } from '../../middlewares/authentication.js';
import multer from 'multer';

const upload = multer({ dest: 'uploads/' });
const catRouter = express.Router();

catRouter.route('/')
  .get(getCats)
  .post(authenticateToken, upload.single('cat'), createThumbnail, postCat);


catRouter.route('/:id')
  .get(getCat)
  .put(authenticateToken, putCat)
  .delete(authenticateToken, deleteCat);

export default catRouter;