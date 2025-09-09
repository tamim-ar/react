const express = require('express');
const router = express.Router();
const Item = require('../models/item');
const authMiddleware = require('../middleware/auth');

router.use(authMiddleware);

// Get all items for an inventory
router.get('/inventory/:inventoryId', async (req, res) => {
  try {
    const items = await Item.getAllByInventory(req.params.inventoryId);
    res.json(items);
  } catch (error) {
    console.error('Error fetching items:', error);
    res.status(500).json({ message: 'Error fetching items' });
  }
});

// Get single item
router.get('/:id', async (req, res) => {
  try {
    const item = await Item.getById(req.params.id);
    if (!item) {
      return res.status(404).json({ message: 'Item not found' });
    }
    res.json(item);
  } catch (error) {
    console.error('Error fetching item:', error);
    res.status(500).json({ message: 'Error fetching item' });
  }
});

// Create item
router.post('/', async (req, res) => {
  try {
    const itemData = {
      ...req.body,
      created_by: req.user.userId
    };
    const item = await Item.create(itemData);
    res.status(201).json(item);
  } catch (error) {
    console.error('Error creating item:', error);
    res.status(500).json({ message: 'Error creating item' });
  }
});

// Update item
router.put('/:id', async (req, res) => {
  try {
    const item = await Item.update(req.params.id, req.body, req.body.version);
    if (!item) {
      return res.status(404).json({ message: 'Item not found' });
    }
    res.json(item);
  } catch (error) {
    if (error.message === 'Version conflict or item not found') {
      res.status(409).json({ message: 'Version conflict, please refresh and try again' });
    } else {
      console.error('Error updating item:', error);
      res.status(500).json({ message: 'Error updating item' });
    }
  }
});

// Delete item
router.delete('/:id', async (req, res) => {
  try {
    const success = await Item.delete(req.params.id);
    if (!success) {
      return res.status(404).json({ message: 'Item not found' });
    }
    res.json({ message: 'Item deleted successfully' });
  } catch (error) {
    console.error('Error deleting item:', error);
    res.status(500).json({ message: 'Error deleting item' });
  }
});

module.exports = router;