import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { findUserByUsername } from '../models/user-model.js';
import 'dotenv/config';

const postLogin = async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await findUserByUsername(username);
    if (!user) {
      return res.status(401).json({ message: 'Väärä käyttäjätunnus tai salasana' });
    }

    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res.status(401).json({ message: 'Väärä käyttäjätunnus tai salasana' });
    }

    const userPayload = {
      user_id: user.user_id,
      name: user.name,
      username: user.username,
      email: user.email,
      role: user.role
    };

    const token = jwt.sign(userPayload, process.env.JWT_SECRET, { expiresIn: '24h' });
    
    res.json({ message: 'Kirjautuminen onnistui', user: userPayload, token });
    
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Palvelinvirhe kirjautumisessa' });
  }
};

const getMe = async (req, res) => {
  console.log('getMe', res.locals.user);
  if (res.locals.user) {
    res.json({ message: 'Token ok', user: res.locals.user });
  } else {
    res.sendStatus(401);
  }
};

export { postLogin, getMe };