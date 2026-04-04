import promisePool from '../../utils/database.js';

const listAllUsers = async () => {
  const rows = await promisePool.query('SELECT user_id, name, username, email, role FROM wsk_users');
  return rows;
};

const findUserById = async (id) => {
  const rows = await promisePool.query(
    'SELECT user_id, name, username, email, role FROM wsk_users WHERE user_id = ?', 
    [id]
  );
  if (rows.length === 0) return false;
  return rows[0];
};

const findUserByIdWithPassword = async (id) => {
  const rows = await promisePool.query('SELECT * FROM wsk_users WHERE user_id = ?', [id]);
  if (rows.length === 0) return false;
  return rows[0];
};

// Käyttäjän haku sähköpostilla (kirjautumiseen)
const getUserByEmail = async (email) => {
  const rows = await promisePool.query(
    'SELECT * FROM wsk_users WHERE email = ?',
    [email]
  );
  if (rows.length === 0) return false;
  return rows[0];
};

// Käyttäjän haku käyttäjänimellä
const findUserByUsername = async (username) => {
  const rows = await promisePool.query(
    'SELECT * FROM wsk_users WHERE username = ?',
    [username]
  );
  if (rows.length === 0) return false;
  return rows[0];
};

const addUser = async (user) => {
  const { name, username, email, password } = user;
  const sql = `INSERT INTO wsk_users (name, username, email, password, role) VALUES (?, ?, ?, ?, 'user')`;
  const params = [name, username, email, password];
  const result = await promisePool.query(sql, params);
  return { user_id: Number(result.insertId) };
};

const updateUser = async (id, user, authUser) => {
  const { name, username, email, password } = user;
  let result;

  if (authUser.role === 'admin') {
    result = await promisePool.query(
      'UPDATE wsk_users SET name = ?, username = ?, email = ?, password = ? WHERE user_id = ?',
      [name, username, email, password, id]
    );
  } else {
    result = await promisePool.query(
      'UPDATE wsk_users SET name = ?, username = ?, email = ?, password = ? WHERE user_id = ? AND user_id = ?',
      [name, username, email, password, id, authUser.user_id]
    );
  }

  return result.affectedRows > 0;
};

const deleteUser = async (id, authUser) => {
  let result;

  if (authUser.role === 'admin') {
    result = await promisePool.query('DELETE FROM wsk_users WHERE user_id = ?', [id]);
  } else {
    result = await promisePool.query('DELETE FROM wsk_users WHERE user_id = ? AND user_id = ?', [id, authUser.user_id]);
  }

  return result.affectedRows > 0;
};

export { listAllUsers, findUserById, findUserByIdWithPassword, addUser, getUserByEmail, findUserByUsername, updateUser, deleteUser };