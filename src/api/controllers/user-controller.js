import {
  listAllUsers,
  findUserById,
  findUserByIdWithPassword,
  addUser,
  updateUser,
  deleteUser as deleteUserModel,
} from '../models/user-model.js';
import bcrypt from 'bcrypt';

const getUsers = async (req, res, next) => {
  try {
    const users = await listAllUsers();
    res.json(users);
  } catch (err) {
    next(err);
  }
};

const getUser = async (req, res, next) => {
  try {
    const user = await findUserById(req.params.id);
    if (!user) {
      const error = new Error('User not found');
      error.status = 404;
      return next(error);
    }
    res.json(user);
  } catch (err) {
    next(err);
  }
};

const postUser = async (req, res, next) => {
  try {
    req.body.password = bcrypt.hashSync(req.body.password, 10);
    const result = await addUser(req.body);
    res.status(201).json({ message: 'Käyttäjä luotu', id: result.user_id });
  } catch (error) {
    error.status = 400;
    next(error);
  }
};

const putUser = async (req, res, next) => {
  try {
    const id = Number(req.params.id);
    const me = res.locals.user;

    if (!me || (me.user_id !== id && me.role !== 'admin')) {
      const error = new Error('Ei oikeutta päivittää tätä käyttäjää');
      error.status = 403;
      return next(error);
    }

    const current = await findUserByIdWithPassword(id);
    if (!current) {
      const error = new Error('User not found');
      error.status = 404;
      return next(error);
    }

    const name = req.body.name || current.name;
    const username = req.body.username || current.username;
    const email = req.body.email || current.email;
    const password = req.body.password ? bcrypt.hashSync(req.body.password, 10) : current.password;

    const updated = await updateUser(id, { name, username, email, password }, me);
    if (!updated) {
      const error = new Error('Päivitys estetty');
      error.status = 403;
      return next(error);
    }

    res.json({ message: 'Käyttäjä päivitetty' });
  } catch (err) {
    next(err);
  }
};

const deleteUser = async (req, res, next) => {
  try {
    const id = Number(req.params.id);
    const me = res.locals.user;

    if (!me || (me.user_id !== id && me.role !== 'admin')) {
      const error = new Error('Ei oikeutta poistaa tätä käyttäjää');
      error.status = 403;
      return next(error);
    }

    const deleted = await deleteUserModel(id, me);
    if (!deleted) {
      const error = new Error('Poisto estetty tai käyttäjää ei löydy');
      error.status = 403;
      return next(error);
    }

    res.json({ message: 'Käyttäjä poistettu' });
  } catch (err) {
    next(err);
  }
};

// TÄMÄ LISTA ON KRIITTINEN: reititin etsii näitä nimiä
export { getUsers, getUser, postUser, putUser, deleteUser };