const pool = require('../models/db');

const checkPermissions = async (req, res, next) => {
  try {
    const { userId } = req.user;
    const inventoryId = req.params.inventoryId || req.body.inventory_id;

    if (!inventoryId) {
      return next();
    }

    // Get user role and inventory details
    const [users] = await pool.query('SELECT role FROM Users WHERE id = ?', [userId]);
    const [inventories] = await pool.query(
      'SELECT creator_id, public FROM Inventories WHERE id = ?',
      [inventoryId]
    );

    if (!inventories.length) {
      return res.status(404).json({ message: 'Inventory not found' });
    }

    const inventory = inventories[0];
    const userRole = users[0]?.role;

    // Admin has full access
    if (userRole === 'admin') {
      req.userAccess = { canWrite: true, canAdmin: true };
      return next();
    }

    // Creator has full access
    if (inventory.creator_id === userId) {
      req.userAccess = { canWrite: true, canAdmin: true };
      return next();
    }

    // Check for explicit access rights
    const [access] = await pool.query(
      'SELECT can_write FROM InventoryAccess WHERE inventory_id = ? AND user_id = ?',
      [inventoryId, userId]
    );

    if (access.length > 0) {
      req.userAccess = { canWrite: access[0].can_write, canAdmin: false };
      return next();
    }

    // Public inventories are read-only for all users
    if (inventory.public) {
      req.userAccess = { canWrite: false, canAdmin: false };
      return next();
    }

    // No access
    return res.status(403).json({ message: 'Access denied' });
  } catch (error) {
    console.error('Permission check error:', error);
    res.status(500).json({ message: 'Error checking permissions' });
  }
};

const requireAdmin = async (req, res, next) => {
  try {
    const [users] = await pool.query('SELECT role FROM Users WHERE id = ?', [req.user.userId]);
    if (users[0]?.role === 'admin') {
      return next();
    }
    res.status(403).json({ message: 'Admin access required' });
  } catch (error) {
    console.error('Admin check error:', error);
    res.status(500).json({ message: 'Error checking admin status' });
  }
};

module.exports = { checkPermissions, requireAdmin };