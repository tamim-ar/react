const express = require('express');
const router = express.Router();
const Discussion = require('../models/discussion');
const authMiddleware = require('../middleware/auth');

router.use(authMiddleware);

// Get discussions for an inventory
router.get('/inventory/:inventoryId', async (req, res) => {
  try {
    const discussions = await Discussion.getByInventory(req.params.inventoryId);
    res.json(discussions);
  } catch (error) {
    console.error('Error fetching discussions:', error);
    res.status(500).json({ message: 'Error fetching discussions' });
  }
});

// Create discussion
router.post('/', async (req, res) => {
  try {
    const discussion = await Discussion.create({
      ...req.body,
      user_id: req.user.userId
    });
    res.status(201).json(discussion);
  } catch (error) {
    console.error('Error creating discussion:', error);
    res.status(500).json({ message: 'Error creating discussion' });
  }
});

// Delete discussion
router.delete('/:id', async (req, res) => {
  try {
    const success = await Discussion.delete(req.params.id, req.user.userId);
    if (!success) {
      return res.status(404).json({ message: 'Discussion not found' });
    }
    res.json({ message: 'Discussion deleted successfully' });
  } catch (error) {
    console.error('Error deleting discussion:', error);
    res.status(500).json({ message: 'Error deleting discussion' });
  }
});

module.exports = router;