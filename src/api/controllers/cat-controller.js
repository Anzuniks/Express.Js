import { listAllCats, findCatById, addCat } from '../models/cat-model.js';

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
  const { cat_name, weight, owner, birthdate } = req.body;
  const filename = req.file ? req.file.filename : 'default.jpg';
  
  const result = await addCat({ cat_name, weight, owner, filename, birthdate });
  if (result) {
    res.status(201).json({ message: 'Kissa lisätty', id: result.cat_id });
  } else {
    res.sendStatus(400);
  }
};

// Voit lisätä nämä myöhemmin, mutta määritellään ne nyt, jotta router ei kaadu
const putCat = (req, res) => res.send('Kissa päivitetty (not implemented)');
const deleteCat = (req, res) => res.send('Kissa poistettu (not implemented)');

// TÄMÄ ON TÄRKEÄ: Nimien on oltava samat kuin routerin importissa!
export { getCats, getCat, postCat, putCat, deleteCat };