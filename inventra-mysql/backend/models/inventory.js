const pool = require('./db');

class Inventory {
  static async create(data) {
    const { title, description, category, image_url, isPublic, creator_id } = data;
    const [result] = await pool.query(
      'INSERT INTO Inventories (title, description, category, image_url, public, creator_id) VALUES (?, ?, ?, ?, ?, ?)',
      [title, description, category, image_url, isPublic, creator_id]
    );
    return this.getById(result.insertId);
  }

  static async getById(id) {
    const [rows] = await pool.query('SELECT * FROM Inventories WHERE id = ?', [id]);
    return rows[0];
  }

  static async getAllByUser(userId) {
    try {
      const [rows] = await pool.query('SELECT * FROM Inventories WHERE creator_id = ? ORDER BY updated_at DESC', [userId]);
      return rows;
    } catch (error) {
      console.error('Error fetching inventories:', error);
      throw error;
    }
  }

  static async update(id, data, version) {
    try {
      const { title, description, category, image_url, isPublic } = data;
      const [result] = await pool.query(
        'UPDATE Inventories SET title = ?, description = ?, category = ?, image_url = ?, public = ?, version = version + 1 WHERE id = ? AND version = ?',
        [title, description, category, image_url, isPublic, id, version]
      );
      if (result.affectedRows === 0) {
        throw new Error('Version conflict or inventory not found');
      }
      return this.getById(id);
    } catch (error) {
      console.error('Error updating inventory:', error);
      throw error;
    }
  }

  static async delete(id, userId) {
    try {
      const [result] = await pool.query(
        'DELETE FROM Inventories WHERE id = ? AND creator_id = ?',
        [id, userId]
      );
      return result.affectedRows > 0;
    } catch (error) {
      console.error('Error deleting inventory:', error);
      throw error;
    }
  }
}

module.exports = Inventory;