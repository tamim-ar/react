const pool = require('./db');

class Like {
  static async toggle(itemId, userId) {
    const connection = await pool.getConnection();
    try {
      await connection.beginTransaction();

      // Check if like exists
      const [likes] = await connection.query(
        'SELECT id FROM Likes WHERE item_id = ? AND user_id = ?',
        [itemId, userId]
      );

      if (likes.length > 0) {
        // Unlike
        await connection.query(
          'DELETE FROM Likes WHERE item_id = ? AND user_id = ?',
          [itemId, userId]
        );
        await connection.commit();
        return { liked: false };
      } else {
        // Like
        await connection.query(
          'INSERT INTO Likes (item_id, user_id) VALUES (?, ?)',
          [itemId, userId]
        );
        await connection.commit();
        return { liked: true };
      }
    } catch (error) {
      await connection.rollback();
      throw error;
    } finally {
      connection.release();
    }
  }

  static async getItemLikes(itemId) {
    const [result] = await pool.query(
      'SELECT COUNT(*) as count FROM Likes WHERE item_id = ?',
      [itemId]
    );
    return result[0].count;
  }

  static async getUserLikes(userId) {
    const [likes] = await pool.query(
      'SELECT item_id FROM Likes WHERE user_id = ?',
      [userId]
    );
    return likes.map(like => like.item_id);
  }
}

module.exports = Like;