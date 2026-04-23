const pool = require('./db');

module.exports = async (req, res) => {
  try {
    const { id } = req.query;

    // 🔒 Validate ID
    if (!id) {
      return res.status(400).json({ message: "Missing movie id" });
    }

    // 🎬 Get movie
    const [movieRows] = await pool.execute(
      'SELECT * FROM movies WHERE id=?',
      [id]
    );

    // 💬 Get comments (safe even if empty)
    const [commentRows] = await pool.execute(
      'SELECT * FROM comments WHERE movie_id=?',
      [id]
    );

    // 🛡️ Prevent crash if no movie found
    const movie = movieRows.length > 0 ? movieRows[0] : null;

    return res.status(200).json({
      movie: movie,
      comments: commentRows || []
    });

  } catch (error) {
    console.log("DETAIL ERROR:", error);

    return res.status(500).json({
      success: false,
      message: "Server error"
    });
  }
};