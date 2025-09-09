const express = require('express');
const router = express.Router();
const Search = require('../models/search');
const authMiddleware = require('../middleware/auth');

router.use(authMiddleware);

// Global search
router.get('/', async (req, res) => {
  try {
    const { q } = req.query;
    if (!q) {
      return res.json([]);
    }
    const results = await Search.searchAll(q, req.user.userId);
    res.json(results);
  } catch (error) {
    console.error('Error performing search:', error);
    res.status(500).json({ message: 'Error performing search' });
  }
});

module.exports = router;