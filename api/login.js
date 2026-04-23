const pool = require('./db');

module.exports = async (req, res) => {
  try {
    // 🔥 Parse body manually (THIS IS THE FIX)
    const body = typeof req.body === "string" ? JSON.parse(req.body) : req.body;

    const { username, password } = body;

    const [rows] = await pool.execute(
      'SELECT * FROM users WHERE username=? AND password=?',
      [username, password]
    );

    if (rows.length > 0) {
      return res.status(200).json({
        success: true,
        user: rows[0]
      });
    } else {
      return res.status(200).json({
        success: false,
        message: "Invalid credentials"
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Server error"
    });
  }
};