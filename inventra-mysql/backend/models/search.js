const pool = require('./db');

class Search {
  static async searchAll(query, userId = null) {
    const searchQuery = `%${query}%`;
    const [results] = await pool.query(`
      SELECT 
        'inventory' as type,
        i.id,
        i.title,
        i.description,
        NULL as custom_id,
        NULL as field_values,
        i.created_at,
        u.name as creator_name
      FROM Inventories i
      JOIN Users u ON i.creator_id = u.id
      WHERE (
        MATCH(i.title, i.description) AGAINST(? IN BOOLEAN MODE)
        OR i.title LIKE ?
        OR i.description LIKE ?
      )
      AND (i.public = true OR i.creator_id = ?)

      UNION

      SELECT 
        'item' as type,
        it.id,
        inv.title as inventory_title,
        NULL as description,
        it.custom_id,
        JSON_OBJECTAGG(iv.field_id, iv.value) as field_values,
        it.created_at,
        u.name as creator_name
      FROM Items it
      JOIN Inventories inv ON it.inventory_id = inv.id
      JOIN Users u ON it.created_by = u.id
      LEFT JOIN ItemValues iv ON it.id = iv.item_id
      WHERE (
        MATCH(it.custom_id) AGAINST(? IN BOOLEAN MODE)
        OR MATCH(iv.value) AGAINST(? IN BOOLEAN MODE)
        OR it.custom_id LIKE ?
      )
      AND (inv.public = true OR inv.creator_id = ?)
      GROUP BY it.id
      ORDER BY created_at DESC
      LIMIT 50
    `, [query, searchQuery, searchQuery, userId, query, query, searchQuery, userId]);

    return results;
  }
}

module.exports = Search;