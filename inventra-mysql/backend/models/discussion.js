const pool = require('./db');

class Discussion {
  static async create(data) {
    const { inventory_id, user_id, content } = data;
    const [result] = await pool.query(
      'INSERT INTO Discussions (inventory_id, user_id, content) VALUES (?, ?, ?)',
      [inventory_id, user_id, content]
    );
    return this.getById(result.insertId);
  }

  static async getById(id) {
    const [discussions] = await pool.query(`
      SELECT d.*, u.name as user_name 
      FROM Discussions d
      JOIN Users u ON d.user_id = u.id
      WHERE d.id = ?
    `, [id]);
    return discussions[0];
  }

  static async getByInventory(inventoryId) {
    const [discussions] = await pool.query(`
      SELECT d.*, u.name as user_name 
      FROM Discussions d
      JOIN Users u ON d.user_id = u.id
      WHERE d.inventory_id = ?
      ORDER BY d.created_at DESC
    `, [inventoryId]);
    return discussions;
  }

  static async delete(id, userId) {
    const [result] = await pool.query(
      'DELETE FROM Discussions WHERE id = ? AND user_id = ?',
      [id, userId]
    );
    return result.affectedRows > 0;
  }
}

module.exports = Discussion;