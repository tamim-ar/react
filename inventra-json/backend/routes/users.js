const express = require('express');
const router = express.Router();
const { readJsonData, writeJsonData } = require('../utils/jsonUtils');
const { authMiddleware } = require('./auth');

// Admin middleware
const adminMiddleware = async (req, res, next) => {
  if (req.user.role !== 'admin') {
    return res.status(403).json({ error: 'Admin access required' });
  }
  next();
};

// Get all users (admin only)
router.get('/', authMiddleware, adminMiddleware, async (req, res) => {
  try {
    const db = await readJsonData();
    const users = db.users.map(u => ({ ...u, password: undefined }));
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch users' });
  }
});

// Update user status (block/unblock) - admin only
router.patch('/:userId/status', authMiddleware, adminMiddleware, async (req, res) => {
  try {
    const { userId } = req.params;
    const { isActive } = req.body;
    
    const db = await readJsonData();
    const userIndex = db.users.findIndex(u => u.id === userId);
    
    if (userIndex === -1) {
      return res.status(404).json({ error: 'User not found' });
    }
    
    // Prevent self-blocking
    if (userId === req.user.id) {
      return res.status(403).json({ error: 'Cannot modify own status' });
    }
    
    db.users[userIndex].isActive = isActive;
    await writeJsonData(db);
    
    res.json({ ...db.users[userIndex], password: undefined });
  } catch (error) {
    res.status(500).json({ error: 'Failed to update user status' });
  }
});

// Update user role (grant/remove admin) - admin only
router.patch('/:userId/role', authMiddleware, adminMiddleware, async (req, res) => {
  try {
    const { userId } = req.params;
    const { role } = req.body;
    
    if (!['admin', 'user'].includes(role)) {
      return res.status(400).json({ error: 'Invalid role' });
    }
    
    const db = await readJsonData();
    const userIndex = db.users.findIndex(u => u.id === userId);
    
    if (userIndex === -1) {
      return res.status(404).json({ error: 'User not found' });
    }
    
    db.users[userIndex].role = role;
    await writeJsonData(db);
    
    res.json({ ...db.users[userIndex], password: undefined });
  } catch (error) {
    res.status(500).json({ error: 'Failed to update user role' });
  }
});

// Delete user (admin only)
router.delete('/:userId', authMiddleware, adminMiddleware, async (req, res) => {
  try {
    const { userId } = req.params;
    
    // Prevent self-deletion
    if (userId === req.user.id) {
      return res.status(403).json({ error: 'Cannot delete own account' });
    }
    
    const db = await readJsonData();
    const userIndex = db.users.findIndex(u => u.id === userId);
    
    if (userIndex === -1) {
      return res.status(404).json({ error: 'User not found' });
    }
    
    db.users.splice(userIndex, 1);
    
    // Remove user's inventories and items
    db.inventories = db.inventories.filter(inv => inv.createdBy !== userId);
    db.items = db.items.filter(item => item.createdBy !== userId);
    db.discussions = db.discussions.filter(disc => disc.userId !== userId);
    
    await writeJsonData(db);
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete user' });
  }
});

module.exports = router;