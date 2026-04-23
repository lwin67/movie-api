const pool = require('./db');

module.exports = async (req, res) => {
  const body = typeof req.body === "string" ? JSON.parse(req.body) : req.body;

  const { movie_id, username, comment } = body;

  await pool.execute(
    'INSERT INTO comments (movie_id, username, comment) VALUES (?, ?, ?)',
    [movie_id, username, comment]
  );

  res.json({ success: true });
};