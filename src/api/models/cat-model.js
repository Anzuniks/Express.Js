import promisePool from '../../utils/database.js';

const listAllCats = async () => {
  // JOIN hakee kissan tiedot JA omistajan nimen wsk_users-taulusta
  const rows = await promisePool.query(`
    SELECT wsk_cats.*, wsk_users.name AS owner_name 
    FROM wsk_cats 
    JOIN wsk_users ON wsk_cats.owner = wsk_users.user_id
  `);
  return rows;
};

const findCatById = async (id) => {
  const rows = await promisePool.query(`
    SELECT wsk_cats.*, wsk_users.name AS owner_name 
    FROM wsk_cats 
    JOIN wsk_users ON wsk_cats.owner = wsk_users.user_id 
    WHERE cat_id = ?`, [id]);
  
  if (rows.length === 0) return false;
  return rows[0];
};

const addCat = async (cat) => {
  const { cat_name, weight, owner, filename, birthdate } = cat;
  const sql = `INSERT INTO wsk_cats (cat_name, weight, owner, filename, birthdate)
               VALUES (?, ?, ?, ?, ?)`;
  const params = [cat_name, weight, owner, filename, birthdate];
  const result = await promisePool.query(sql, params);
  return { cat_id: Number(result.insertId) };
};

const updateCat = async (id, cat, authUser) => {
  const { cat_name, weight, birthdate } = cat;
  let result;

  if (authUser.role === 'admin') {
    result = await promisePool.query(
      `UPDATE wsk_cats
       SET cat_name = ?, weight = ?, birthdate = ?
       WHERE cat_id = ?`,
      [cat_name, weight, birthdate, id]
    );
  } else {
    result = await promisePool.query(
      `UPDATE wsk_cats
       SET cat_name = ?, weight = ?, birthdate = ?
       WHERE cat_id = ? AND owner = ?`,
      [cat_name, weight, birthdate, id, authUser.user_id]
    );
  }

  return result.affectedRows > 0;
};

const deleteCat = async (id, authUser) => {
  let result;

  if (authUser.role === 'admin') {
    result = await promisePool.query('DELETE FROM wsk_cats WHERE cat_id = ?', [id]);
  } else {
    result = await promisePool.query('DELETE FROM wsk_cats WHERE cat_id = ? AND owner = ?', [id, authUser.user_id]);
  }

  return result.affectedRows > 0;
};

export { listAllCats, findCatById, addCat, updateCat, deleteCat };