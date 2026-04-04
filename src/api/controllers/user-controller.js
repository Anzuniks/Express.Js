import {
  listAllUsers,
  findUserById,
  findUserByIdWithPassword,
  addUser,
  updateUser,
  deleteUser as deleteUserModel,
} from '../models/user-model.js';
import bcrypt from 'bcrypt';

const getUsers = async (req, res) => {
  const users = await listAllUsers();
  res.json(users);
};

const getUser = async (req, res) => {
  const user = await findUserById(req.params.id);
  if (user) {
    res.json(user);
  } else {
    res.sendStatus(404);
  }
};

const postUser = async (req, res) => {
  const { email, password } = req.body;
  const username = req.body.username || email?.split('@')[0];
  const name = req.body.name || username;

  if (!email || !password || !username || !name) {
    return res.status(400).json({ message: 'name, username, email ja password vaaditaan' });
  }

  req.body.username = username;
  req.body.name = name;
  req.body.password = bcrypt.hashSync(req.body.password, 10);

  try {
    const result = await addUser(req.body);
    if (result) {
      res.status(201).json({ message: 'Käyttäjä luotu', id: result.user_id });
    } else {
      res.sendStatus(400);
    }
  } catch (error) {
    res.status(400).json({ message: 'Käyttäjän luonti epäonnistui', error: error.message });
  }
};

const putUser = async (req, res) => {
  const id = Number(req.params.id);
  const me = res.locals.user;

  if (!me || (me.user_id !== id && me.role !== 'admin')) {
    return res.status(403).json({ message: 'Ei oikeutta päivittää tätä käyttäjää' });
  }

  const current = await findUserByIdWithPassword(id);
  if (!current) {
    return res.sendStatus(404);
  }

  const name = req.body.name || current.name;
  const username = req.body.username || current.username;
  const email = req.body.email || current.email;
  const password = req.body.password ? bcrypt.hashSync(req.body.password, 10) : current.password;

  const updated = await updateUser(id, { name, username, email, password }, me);
  if (updated) {
    res.json({ message: 'Käyttäjä päivitetty' });
  } else {
    res.status(403).json({ message: 'Päivitys estetty' });
  }
};

const deleteUser = async (req, res) => {
  const id = Number(req.params.id);
  const me = res.locals.user;

  if (!me || (me.user_id !== id && me.role !== 'admin')) {
    return res.status(403).json({ message: 'Ei oikeutta poistaa tätä käyttäjää' });
  }

  const deleted = await deleteUserModel(id, me);
  if (deleted) {
    res.json({ message: 'Käyttäjä poistettu' });
  } else {
    res.status(403).json({ message: 'Poisto estetty tai käyttäjää ei löydy' });
  }
};

// TÄMÄ LISTA ON KRIITTINEN: reititin etsii näitä nimiä
export { getUsers, getUser, postUser, putUser, deleteUser };