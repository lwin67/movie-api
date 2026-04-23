const pool = require('./db');

module.exports = async (req, res) => {
  const [rows] = await pool.execute('SELECT * FROM movies');
  res.json(rows);
};