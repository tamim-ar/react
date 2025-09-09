const pool = require('./db');

class Item {
  static async create(data) {
    const { inventory_id, custom_id, created_by, fields } = data;

    const connection = await pool.getConnection();
    try {
      await connection.beginTransaction();

      // Create item
      const [itemResult] = await connection.query(
        'INSERT INTO Items (inventory_id, custom_id, created_by) VALUES (?, ?, ?)',
        [inventory_id, custom_id, created_by]
      );
      const itemId = itemResult.insertId;

      // Insert field values
      if (fields && fields.length > 0) {
        const valueInserts = fields.map(field => 
          connection.query(
            'INSERT INTO ItemValues (item_id, field_id, value) VALUES (?, ?, ?)',
            [itemId, field.field_id, field.value]
          )
        );
        await Promise.all(valueInserts);
      }

      await connection.commit();
      return this.getById(itemId);
    } catch (error) {
      await connection.rollback();
      throw error;
    } finally {
      connection.release();
    }
  }

  static async getById(id) {
    const [items] = await pool.query(`
      SELECT i.*, 
             JSON_OBJECTAGG(iv.field_id, iv.value) as field_values,
             u.name as creator_name
      FROM Items i
      LEFT JOIN ItemValues iv ON i.id = iv.item_id
      LEFT JOIN Users u ON i.created_by = u.id
      WHERE i.id = ?
      GROUP BY i.id
    `, [id]);
    return items[0];
  }

  static async getAllByInventory(inventoryId) {
    const [items] = await pool.query(`
      SELECT i.*, 
             JSON_OBJECTAGG(iv.field_id, iv.value) as field_values,
             u.name as creator_name
      FROM Items i
      LEFT JOIN ItemValues iv ON i.id = iv.item_id
      LEFT JOIN Users u ON i.created_by = u.id
      WHERE i.inventory_id = ?
      GROUP BY i.id
      ORDER BY i.created_at DESC
    `, [inventoryId]);
    return items;
  }

  static async update(id, data, version) {
    const connection = await pool.getConnection();
    try {
      await connection.beginTransaction();

      const { custom_id, fields } = data;
      const [result] = await connection.query(
        'UPDATE Items SET custom_id = ?, version = version + 1 WHERE id = ? AND version = ?',
        [custom_id, id, version]
      );

      if (result.affectedRows === 0) {
        throw new Error('Version conflict or item not found');
      }

      if (fields) {
        await connection.query('DELETE FROM ItemValues WHERE item_id = ?', [id]);
        const valueInserts = fields.map(field =>
          connection.query(
            'INSERT INTO ItemValues (item_id, field_id, value) VALUES (?, ?, ?)',
            [id, field.field_id, field.value]
          )
        );
        await Promise.all(valueInserts);
      }

      await connection.commit();
      return this.getById(id);
    } catch (error) {
      await connection.rollback();
      throw error;
    } finally {
      connection.release();
    }
  }

  static async delete(id) {
    const [result] = await pool.query('DELETE FROM Items WHERE id = ?', [id]);
    return result.affectedRows > 0;
  }
}

module.exports = Item;