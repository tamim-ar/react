const express = require('express');
const router = express.Router();
const { readJsonData, writeJsonData } = require('../utils/jsonUtils');
const { authMiddleware } = require('./auth');

// Get items by inventory
router.get('/inventory/:inventoryId', async (req, res) => {
  try {
    const { inventoryId } = req.params;
    const db = await readJsonData();
    
    const inventory = db.inventories.find(inv => inv.id === inventoryId);
    if (!inventory) {
      return res.status(404).json({ error: 'Inventory not found' });
    }

    // Check read access
    const hasAccess = inventory.access.readers.includes('*') || 
                     (req.user && (inventory.createdBy === req.user.id || 
                      inventory.access.readers.includes(req.user.id)));

    if (!hasAccess) {
      return res.status(403).json({ error: 'Access denied' });
    }

    const items = db.items.filter(item => item.inventoryId === inventoryId);
    res.json(items);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch items' });
  }
});

// Create item (authenticated + access check)
router.post('/', authMiddleware, async (req, res) => {
  try {
    const { inventoryId, customId, customFields } = req.body;
    const db = await readJsonData();
    
    const inventory = db.inventories.find(inv => inv.id === inventoryId);
    if (!inventory) {
      return res.status(404).json({ error: 'Inventory not found' });
    }

    // Check write access
    const hasAccess = req.user.role === 'admin' || 
                     inventory.createdBy === req.user.id || 
                     inventory.access.editors.includes(req.user.id);

    if (!hasAccess) {
      return res.status(403).json({ error: 'Access denied' });
    }

    const newItem = {
      id: `itm_${Date.now()}`,
      inventoryId,
      customId,
      customFields,
      createdBy: req.user.id,
      createdAt: new Date().toISOString()
    };

    db.items.push(newItem);
    await writeJsonData(db);
    res.status(201).json(newItem);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create item' });
  }
});

// Update item (authenticated + access check)
router.put('/:id', authMiddleware, async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;
    const db = await readJsonData();
    
    const itemIndex = db.items.findIndex(item => item.id === id);
    if (itemIndex === -1) {
      return res.status(404).json({ error: 'Item not found' });
    }

    const item = db.items[itemIndex];
    const inventory = db.inventories.find(inv => inv.id === item.inventoryId);
    
    // Check write access
    const hasAccess = req.user.role === 'admin' || 
                     inventory.createdBy === req.user.id || 
                     inventory.access.editors.includes(req.user.id);

    if (!hasAccess) {
      return res.status(403).json({ error: 'Access denied' });
    }

    // Update item
    db.items[itemIndex] = {
      ...item,
      ...updates,
      id, // Preserve ID
      inventoryId: item.inventoryId, // Preserve inventory
      createdBy: item.createdBy, // Preserve creator
      createdAt: item.createdAt // Preserve creation date
    };

    await writeJsonData(db);
    res.json(db.items[itemIndex]);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update item' });
  }
});

// Delete item (authenticated + access check)
router.delete('/:id', authMiddleware, async (req, res) => {
  try {
    const { id } = req.params;
    const db = await readJsonData();
    
    const itemIndex = db.items.findIndex(item => item.id === id);
    if (itemIndex === -1) {
      return res.status(404).json({ error: 'Item not found' });
    }

    const item = db.items[itemIndex];
    const inventory = db.inventories.find(inv => inv.id === item.inventoryId);
    
    // Check write access
    const hasAccess = req.user.role === 'admin' || 
                     inventory.createdBy === req.user.id || 
                     inventory.access.editors.includes(req.user.id);

    if (!hasAccess) {
      return res.status(403).json({ error: 'Access denied' });
    }

    db.items.splice(itemIndex, 1);
    await writeJsonData(db);
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete item' });
  }
});

module.exports = router;