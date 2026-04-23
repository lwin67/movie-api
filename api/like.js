const pool = require('./db');

module.exports = async (req, res) => {
  const body = typeof req.body === "string" ? JSON.parse(req.body) : req.body;

  const { movie_id } = body;

  await pool.execute(
    'UPDATE movies SET likes = likes + 1 WHERE id=?',
    [movie_id]
  );

  res.json({ success: true });
};