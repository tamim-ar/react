const express = require('express');
const router = express.Router();
const InventoryField = require('../models/inventoryField');
const authMiddleware = require('../middleware/auth');

router.use(authMiddleware);

// Get all fields for an inventory
router.get('/inventory/:inventoryId', async (req, res) => {
  try {
    const fields = await InventoryField.getAllByInventory(req.params.inventoryId);
    res.json(fields);
  } catch (error) {
    console.error('Error fetching fields:', error);
    res.status(500).json({ message: 'Error fetching fields' });
  }
});

// Create field
router.post('/', async (req, res) => {
  try {
    const field = await InventoryField.create(req.body);
    res.status(201).json(field);
  } catch (error) {
    console.error('Error creating field:', error);
    res.status(500).json({ message: 'Error creating field' });
  }
});

// Update field
router.put('/:id', async (req, res) => {
  try {
    const field = await InventoryField.update(req.params.id, req.body);
    if (!field) {
      return res.status(404).json({ message: 'Field not found' });
    }
    res.json(field);
  } catch (error) {
    console.error('Error updating field:', error);
    res.status(500).json({ message: 'Error updating field' });
  }
});

// Update field order
router.put('/order/:inventoryId', async (req, res) => {
  try {
    await InventoryField.updateOrder(req.body.fields);
    const fields = await InventoryField.getAllByInventory(req.params.inventoryId);
    res.json(fields);
  } catch (error) {
    console.error('Error updating field order:', error);
    res.status(500).json({ message: 'Error updating field order' });
  }
});

// Delete field
router.delete('/:id', async (req, res) => {
  try {
    const success = await InventoryField.delete(req.params.id);
    if (!success) {
      return res.status(404).json({ message: 'Field not found' });
    }
    res.json({ message: 'Field deleted successfully' });
  } catch (error) {
    console.error('Error deleting field:', error);
    res.status(500).json({ message: 'Error deleting field' });
  }
});

module.exports = router;