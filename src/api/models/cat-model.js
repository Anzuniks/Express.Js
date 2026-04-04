import promisePool from '../../utils/database.js';

const listAllCats = async () => {
  // JOIN hakee kissan tiedot JA omistajan nimen wsk_users-taulusta
  const [rows] = await promisePool.query(`
    SELECT wsk_cats.*, wsk_users.name AS owner_name 
    FROM wsk_cats 
    JOIN wsk_users ON wsk_cats.owner = wsk_users.user_id
  `);
  return rows;
};

const findCatById = async (id) => {
  const [rows] = await promisePool.execute(`
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
  const [result] = await promisePool.execute(sql, params);
  return { cat_id: result.insertId };
};

export { listAllCats, findCatById, addCat };