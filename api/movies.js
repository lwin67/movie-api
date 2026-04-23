const pool = require('./db');

module.exports = async (req, res) => {
  const { id } = req.query;

  const [movie] = await pool.execute(
    'SELECT * FROM movies WHERE id=?',
    [id]
  );

  const [comments] = await pool.execute(
    'SELECT * FROM comments WHERE movie_id=?',
    [id]
  );

  res.json({
    movie: movie[0],
    comments: comments
  });
};