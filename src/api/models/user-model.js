import promisePool from '../../utils/database.js';

const listAllUsers = async () => {
  const [rows] = await promisePool.query('SELECT user_id, name, email FROM wsk_users');
  return rows;
};

const findUserById = async (id) => {
  const [rows] = await promisePool.execute(
    'SELECT user_id, name, email FROM wsk_users WHERE user_id = ?', 
    [id]
  );
  if (rows.length === 0) return false;
  return rows[0];
};

const addUser = async (user) => {
  const { name, email, password } = user;
  const sql = `INSERT INTO wsk_users (name, email, password) VALUES (?, ?, ?)`;
  const params = [name, email, password];
  const [result] = await promisePool.execute(sql, params);
  return { user_id: result.insertId };
};

// TÄMÄ on se kohta, jota controlleri lukee:
export { listAllUsers, findUserById, addUser };