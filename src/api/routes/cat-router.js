import express from 'express';
import { getCats, getCat, postCat, putCat, deleteCat } from '../controllers/cat-controller.js';
// Huom! Polku middlewareen on kaksi tasoa ylöspäin
import { createThumbnail } from '../../middlewares/upload.js';
import multer from 'multer';

const upload = multer({ dest: 'uploads/' });
const catRouter = express.Router();

catRouter.route('/')
  .get(getCats)
  .post(upload.single('cat'), createThumbnail, postCat);


catRouter.route('/:id')
  .get(getCat)
  .put(putCat)
  .delete(deleteCat);

export default catRouter;