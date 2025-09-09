const express = require('express');
const router = express.Router();
const Like = require('../models/like');
const authMiddleware = require('../middleware/auth');

router.use(authMiddleware);

// Toggle like
router.post('/toggle/:itemId', async (req, res) => {
  try {
    const result = await Like.toggle(req.params.itemId, req.user.userId);
    res.json(result);
  } catch (error) {
    console.error('Error toggling like:', error);
    res.status(500).json({ message: 'Error toggling like' });
  }
});

// Get item likes count
router.get('/item/:itemId', async (req, res) => {
  try {
    const count = await Like.getItemLikes(req.params.itemId);
    res.json({ count });
  } catch (error) {
    console.error('Error fetching likes:', error);
    res.status(500).json({ message: 'Error fetching likes' });
  }
});

// Get user likes
router.get('/user', async (req, res) => {
  try {
    const likes = await Like.getUserLikes(req.user.userId);
    res.json(likes);
  } catch (error) {
    console.error('Error fetching user likes:', error);
    res.status(500).json({ message: 'Error fetching user likes' });
  }
});

module.exports = router;