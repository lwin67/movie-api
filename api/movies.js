const pool = require('./db');

module.exports = async (req, res) => {
  try {
    // ✅ NO id needed here
    const [rows] = await pool.execute('SELECT * FROM movies');

    return res.status(200).json(rows);
  } catch (error) {
    console.log("MOVIES ERROR:", error);

    return res.status(500).json({
      success: false,
      message: "Server error"
    });
  }
};