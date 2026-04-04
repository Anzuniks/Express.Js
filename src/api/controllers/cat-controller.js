import { listAllCats, findCatById, addCat, updateCat, deleteCat as deleteCatModel } from '../models/cat-model.js';

const getCats = async (req, res, next) => {
  try {
    const cats = await listAllCats();
    res.json(cats);
  } catch (err) {
    next(err);
  }
};

const getCat = async (req, res, next) => {
  try {
    const cat = await findCatById(req.params.id);
    if (!cat) {
      const error = new Error('Cat not found');
      error.status = 404;
      return next(error);
    }
    res.json(cat);
  } catch (err) {
    next(err);
  }
};

const postCat = async (req, res, next) => {
  try {
    if (!req.file) {
      const error = new Error('Invalid or missing file');
      error.status = 400;
      return next(error);
    }

    const { cat_name, weight, birthdate } = req.body;
    const owner = res.locals.user?.user_id || req.body.owner;
    const filename = req.file.filename;

    const result = await addCat({ cat_name, weight, owner, filename, birthdate });
    res.status(201).json({ message: 'Kissa lisätty', id: result.cat_id });
  } catch (err) {
    err.status = err.status || 400;
    next(err);
  }
};

const putCat = async (req, res, next) => {
  try {
    const { cat_name, weight, birthdate } = req.body;
    if (!cat_name || weight == null) {
      const error = new Error('cat_name ja weight vaaditaan');
      error.status = 400;
      return next(error);
    }

    const updated = await updateCat(req.params.id, { cat_name, weight, birthdate: birthdate || null }, res.locals.user);
    if (!updated) {
      const error = new Error('Ei oikeutta päivittää tätä kissaa tai kissaa ei löydy');
      error.status = 403;
      return next(error);
    }

    res.json({ message: 'Kissa päivitetty' });
  } catch (err) {
    next(err);
  }
};

const deleteCat = async (req, res, next) => {
  try {
    const deleted = await deleteCatModel(req.params.id, res.locals.user);
    if (!deleted) {
      const error = new Error('Ei oikeutta poistaa tätä kissaa tai kissaa ei löydy');
      error.status = 403;
      return next(error);
    }

    res.json({ message: 'Kissa poistettu' });
  } catch (err) {
    next(err);
  }
};

// TÄMÄ ON TÄRKEÄ: Nimien on oltava samat kuin routerin importissa!
export { getCats, getCat, postCat, putCat, deleteCat };