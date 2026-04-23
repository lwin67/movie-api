const pool = require('./db');

module.exports = async (req, res) => {
  try {
    const [rows] = await pool.execute('SELECT * FROM movies');

    res.status(200).json(rows);
  } catch (error) {
    console.log("MOVIES ERROR:", error);

    res.status(500).json({
      success: false,
      message: "Server error"
    });
  }
};