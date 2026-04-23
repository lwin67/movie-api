const pool = require('./db');

module.exports = async (req, res) => {
  try {
    const { id } = req.query;

    if (!id) {
      return res.status(400).json({ message: "Missing movie id" });
    }

    const [movieRows] = await pool.execute(
      'SELECT * FROM movies WHERE id=?',
      [id]
    );

    const [commentRows] = await pool.execute(
      'SELECT * FROM comments WHERE movie_id=?',
      [id]
    );

    return res.status(200).json({
      movie: movieRows[0] || null,
      comments: commentRows || []
    });

  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Server error" });
  }
};