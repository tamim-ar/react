const express = require('express');
const router = express.Router();
const pool = require('../models/db');
const authMiddleware = require('../middleware/auth');

router.use(authMiddleware);

// Get all inventories for the user
router.get('/', async (req, res) => {
  try {
    const [inventories] = await pool.query(
      `SELECT i.*, u.name as creator_name 
       FROM Inventories i 
       JOIN Users u ON i.creator_id = u.id 
       WHERE i.creator_id = ? OR i.public = true 
       ORDER BY i.created_at DESC`,
      [req.user.userId]
    );
    res.json(inventories);
  } catch (error) {
    console.error('Error fetching inventories:', error);
    res.status(500).json({ message: 'Error fetching inventories' });
  }
});

// Get single inventory
router.get('/:id', async (req, res) => {
  try {
    const [inventories] = await pool.query(
      `SELECT i.*, u.name as creator_name 
       FROM Inventories i 
       JOIN Users u ON i.creator_id = u.id 
       WHERE i.id = ? AND (i.creator_id = ? OR i.public = true)`,
      [req.params.id, req.user.userId]
    );

    if (inventories.length === 0) {
      return res.status(404).json({ message: 'Inventory not found' });
    }

    res.json(inventories[0]);
  } catch (error) {
    console.error('Error fetching inventory:', error);
    res.status(500).json({ message: 'Error fetching inventory' });
  }
});

// Create inventory
router.post('/', async (req, res) => {
  try {
    const { title, description, category, isPublic } = req.body;
    const [result] = await pool.query(
      'INSERT INTO Inventories (title, description, category, public, creator_id) VALUES (?, ?, ?, ?, ?)',
      [title, description, category, isPublic, req.user.userId]
    );
    
    const [inventory] = await pool.query(
      'SELECT * FROM Inventories WHERE id = ?',
      [result.insertId]
    );
    
    res.status(201).json(inventory[0]);
  } catch (error) {
    console.error('Error creating inventory:', error);
    res.status(500).json({ message: 'Error creating inventory' });
  }
});

// Update inventory
router.put('/:id', async (req, res) => {
  try {
    const { title, description, category, isPublic } = req.body;
    const [result] = await pool.query(
      'UPDATE Inventories SET title = ?, description = ?, category = ?, public = ? WHERE id = ? AND creator_id = ?',
      [title, description, category, isPublic, req.params.id, req.user.userId]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Inventory not found or unauthorized' });
    }

    const [inventory] = await pool.query(
      'SELECT * FROM Inventories WHERE id = ?',
      [req.params.id]
    );
    
    res.json(inventory[0]);
  } catch (error) {
    console.error('Error updating inventory:', error);
    res.status(500).json({ message: 'Error updating inventory' });
  }
});

// Delete inventory
router.delete('/:id', async (req, res) => {
  try {
    const [result] = await pool.query(
      'DELETE FROM Inventories WHERE id = ? AND creator_id = ?',
      [req.params.id, req.user.userId]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Inventory not found or unauthorized' });
    }

    res.json({ message: 'Inventory deleted successfully' });
  } catch (error) {
    console.error('Error deleting inventory:', error);
    res.status(500).json({ message: 'Error deleting inventory' });
  }
});

module.exports = router;