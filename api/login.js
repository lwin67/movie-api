const pool = require('./db');

module.exports = async (req, res) => {
  const { username, password } = req.body;

  const [rows] = await pool.execute(
    'SELECT * FROM users WHERE username=? AND password=?',
    [username, password]
  );

  if (rows.length > 0) {
    res.json({
      success: true,
      user: rows[0]
    });
  } else {
    res.json({
      success: false,
      message: "Invalid credentials"
    });
  }
};