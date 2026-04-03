import {addCat, findCatById, listAllCats} from '../models/cat-model.js';

const getCat = (req, res) => res.json(listAllCats());

const getCatById = (req, res) => {
    const cat = findCatById(req.params.id);
    if (cat) {
        res.json(cat);
    } else {
        res.sendStatus(404);
    }
};






const postCat = (req, res) => {
  console.log('Form data (req.body):', req.body);
  console.log('File data (req.file):', req.file);



  const filename = req.file ? req.file.filename : 'default.png';
const result = addCat(req.body, filename);


if (result.cat_id) {
    res.status(201).json({ message: 'Cat added successfully', result });
  } else {
    res.sendStatus(400);
  }
};



const putCat = (req, res) => {
    res.json({message: 'Cat item updated successfully'});
};

const deleteCat = (req, res) => {
    res.json({message: 'Cat item deleted successfully'});
};

export {getCat, getCatById, postCat, putCat, deleteCat};

