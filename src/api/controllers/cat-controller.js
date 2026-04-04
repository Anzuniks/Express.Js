import { listAllCats, findCatById, addCat, updateCat, deleteCat as deleteCatModel } from '../models/cat-model.js';

const getCats = async (req, res) => {
  const cats = await listAllCats();
  res.json(cats);
};

const getCat = async (req, res) => {
  const cat = await findCatById(req.params.id);
  if (cat) {
    res.json(cat);
  } else {
    res.sendStatus(404);
  }
};

const postCat = async (req, res) => {
  // Huom! Tässä pitää olla ne tiedot, joita tietokanta odottaa
  const { cat_name, weight, birthdate } = req.body;
  const owner = res.locals.user?.user_id || req.body.owner;
  const filename = req.file ? req.file.filename : 'default.jpg';
  
  const result = await addCat({ cat_name, weight, owner, filename, birthdate });
  if (result) {
    res.status(201).json({ message: 'Kissa lisätty', id: result.cat_id });
  } else {
    res.sendStatus(400);
  }
};

const putCat = async (req, res) => {
  const { cat_name, weight, birthdate } = req.body;
  if (!cat_name || weight == null) {
    return res.status(400).json({ message: 'cat_name ja weight vaaditaan' });
  }

  const updated = await updateCat(req.params.id, { cat_name, weight, birthdate: birthdate || null }, res.locals.user);
  if (updated) {
    res.json({ message: 'Kissa päivitetty' });
  } else {
    res.status(403).json({ message: 'Ei oikeutta päivittää tätä kissaa tai kissaa ei löydy' });
  }
};

const deleteCat = async (req, res) => {
  const deleted = await deleteCatModel(req.params.id, res.locals.user);
  if (deleted) {
    res.json({ message: 'Kissa poistettu' });
  } else {
    res.status(403).json({ message: 'Ei oikeutta poistaa tätä kissaa tai kissaa ei löydy' });
  }
};

// TÄMÄ ON TÄRKEÄ: Nimien on oltava samat kuin routerin importissa!
export { getCats, getCat, postCat, putCat, deleteCat };