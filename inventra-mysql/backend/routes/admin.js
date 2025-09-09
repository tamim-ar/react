const express = require('express');
const router = express.Router();
const pool = require('../models/db');
const authMiddleware = require('../middleware/auth');
const { requireAdmin } = require('../middleware/permissions');

router.use(authMiddleware);
router.use(requireAdmin);

// Get all users
router.get('/users', async (req, res) => {
  try {
    const [users] = await pool.query('SELECT id, name, email, role, blocked FROM Users');
    res.json(users);
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ message: 'Error fetching users' });
  }
});

// Block/unblock user
router.put('/users/:id/block', async (req, res) => {
  try {
    const { blocked } = req.body;
    await pool.query('UPDATE Users SET blocked = ? WHERE id = ?', [blocked, req.params.id]);
    res.json({ message: `User ${blocked ? 'blocked' : 'unblocked'} successfully` });
  } catch (error) {
    console.error('Error updating user block status:', error);
    res.status(500).json({ message: 'Error updating user block status' });
  }
});

// Update user role
router.put('/users/:id/role', async (req, res) => {
  try {
    const { role } = req.body;
    
    // Don't allow self-role change
    if (parseInt(req.params.id) === req.user.userId) {
      return res.status(400).json({ message: 'Cannot modify own role' });
    }

    await pool.query('UPDATE Users SET role = ? WHERE id = ?', [role, req.params.id]);
    res.json({ message: 'User role updated successfully' });
  } catch (error) {
    console.error('Error updating user role:', error);
    res.status(500).json({ message: 'Error updating user role' });
  }
});

// Self admin role removal
router.put('/self/remove-admin', async (req, res) => {
  try {
    await pool.query('UPDATE Users SET role = "user" WHERE id = ?', [req.user.userId]);
    res.json({ message: 'Admin role removed successfully' });
  } catch (error) {
    console.error('Error removing admin role:', error);
    res.status(500).json({ message: 'Error removing admin role' });
  }
});

// Delete user
router.delete('/users/:id', async (req, res) => {
  try {
    if (parseInt(req.params.id) === req.user.userId) {
      return res.status(400).json({ message: 'Cannot delete own account' });
    }

    await pool.query('DELETE FROM Users WHERE id = ?', [req.params.id]);
    res.json({ message: 'User deleted successfully' });
  } catch (error) {
    console.error('Error deleting user:', error);
    res.status(500).json({ message: 'Error deleting user' });
  }
});

// Get database stats
router.get('/db-info', async (req, res) => {
  try {
    // Check if user is admin
    const [users] = await pool.query('SELECT role FROM Users WHERE id = ?', [req.user.userId]);
    if (users[0]?.role !== 'admin') {
      return res.status(403).json({ message: 'Admin access required' });
    }

    // Get table counts
    const [inventoryCount] = await pool.query('SELECT COUNT(*) as count FROM Inventories');
    const [userCount] = await pool.query('SELECT COUNT(*) as count FROM Users');
    const [itemCount] = await pool.query('SELECT COUNT(*) as count FROM Items');
    const [fieldCount] = await pool.query('SELECT COUNT(*) as count FROM InventoryFields');

    // Get recent inventories
    const [recentInventories] = await pool.query(
      `SELECT i.*, u.name as creator_name 
       FROM Inventories i 
       JOIN Users u ON i.creator_id = u.id 
       ORDER BY i.created_at DESC 
       LIMIT 5`
    );

    // Get user list
    const [userList] = await pool.query(
      'SELECT id, name, email, role, created_at FROM Users ORDER BY created_at DESC'
    );

    res.json({
      stats: {
        inventories: inventoryCount[0].count,
        users: userCount[0].count,
        items: itemCount[0].count,
        fields: fieldCount[0].count
      },
      recentInventories,
      users: userList
    });
  } catch (error) {
    console.error('Error fetching database info:', error);
    res.status(500).json({ message: 'Error fetching database information' });
  }
});

module.exports = router;