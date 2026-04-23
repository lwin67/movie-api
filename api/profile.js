const pool = require('./db');

module.exports = async (req, res) => {
  const { id } = req.query;

  const [rows] = await pool.execute(
    'SELECT id, username, email FROM users WHERE id=?',
    [id]
  );

  res.json(rows[0]);
};