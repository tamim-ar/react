const pool = require('./db');

class InventoryField {
  static async create(data) {
    const { inventory_id, name, type, required, order_index } = data;
    const [result] = await pool.query(
      'INSERT INTO InventoryFields (inventory_id, name, type, required, order_index) VALUES (?, ?, ?, ?, ?)',
      [inventory_id, name, type, required, order_index]
    );
    return this.getById(result.insertId);
  }

  static async getById(id) {
    const [fields] = await pool.query('SELECT * FROM InventoryFields WHERE id = ?', [id]);
    return fields[0];
  }

  static async getAllByInventory(inventoryId) {
    const [fields] = await pool.query(
      'SELECT * FROM InventoryFields WHERE inventory_id = ? ORDER BY order_index',
      [inventoryId]
    );
    return fields;
  }

  static async update(id, data) {
    const { name, type, required, order_index } = data;
    await pool.query(
      'UPDATE InventoryFields SET name = ?, type = ?, required = ?, order_index = ? WHERE id = ?',
      [name, type, required, order_index, id]
    );
    return this.getById(id);
  }

  static async updateOrder(fields) {
    const connection = await pool.getConnection();
    try {
      await connection.beginTransaction();
      
      for (const field of fields) {
        await connection.query(
          'UPDATE InventoryFields SET order_index = ? WHERE id = ?',
          [field.order_index, field.id]
        );
      }
      
      await connection.commit();
    } catch (error) {
      await connection.rollback();
      throw error;
    } finally {
      connection.release();
    }
  }

  static async delete(id) {
    const [result] = await pool.query('DELETE FROM InventoryFields WHERE id = ?', [id]);
    return result.affectedRows > 0;
  }
}

module.exports = InventoryField;