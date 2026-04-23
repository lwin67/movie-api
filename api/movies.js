const pool = require('./db');

module.exports = async (req, res) => {
  try {
    const [rows] = await pool.execute('SELECT * FROM movies');
    return res.status(200).json(rows);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Server error" });
  }
};