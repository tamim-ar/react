const pool = require('./db');

class User {
  static async getAllUsers() {
    try {
      const [rows] = await pool.query('SELECT id, name, email, role, theme, language, created_at FROM Users');
      return rows;
    } catch (error) {
      throw error;
    }
  }

  static async getUserById(id) {
    try {
      const [rows] = await pool.query('SELECT id, name, email, role, theme, language, created_at FROM Users WHERE id = ?', [id]);
      return rows[0];
    } catch (error) {
      throw error;
    }
  }
}

module.exports = User;