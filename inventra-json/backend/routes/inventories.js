const express = require('express');
const router = express.Router();
const { readJsonData, writeJsonData } = require('../utils/jsonUtils');
const { authMiddleware } = require('./auth');

// Get all inventories
router.get('/', async (req, res) => {
  try {
    const db = await readJsonData();
    // Filter private inventories if user is not authenticated
    const inventories = db.inventories.filter(inv => 
      inv.access.readers.includes('*') || 
      (req.user && (inv.createdBy === req.user.id || inv.access.readers.includes(req.user.id)))
    );
    res.json(inventories);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch inventories' });
  }
});

// Get single inventory
router.get('/:id', async (req, res) => {
  try {
    const db = await readJsonData();
    const inventory = db.inventories.find(inv => inv.id === req.params.id);
    
    if (!inventory) {
      return res.status(404).json({ error: 'Inventory not found' });
    }

    // Check access
    const hasAccess = inventory.access.readers.includes('*') || 
                     (req.user && (inventory.createdBy === req.user.id || 
                      inventory.access.readers.includes(req.user.id)));

    if (!hasAccess) {
      return res.status(403).json({ error: 'Access denied' });
    }

    res.json(inventory);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch inventory' });
  }
});

// Create inventory (authenticated)
router.post('/', authMiddleware, async (req, res) => {
  try {
    const { title, description, category, tags, customFields } = req.body;
    const db = await readJsonData();

    const newInventory = {
      id: `inv_${Date.now()}`,
      title,
      description,
      category,
      tags: tags || [],
      customFields: customFields || [],
      createdBy: req.user.id,
      createdAt: new Date().toISOString(),
      access: {
        readers: ['*'],
        editors: [req.user.id]
      }
    };

    db.inventories.push(newInventory);
    await writeJsonData(db);
    res.status(201).json(newInventory);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create inventory' });
  }
});

// Update inventory (authenticated + access check)
router.put('/:id', authMiddleware, async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;
    const db = await readJsonData();
    
    const inventoryIndex = db.inventories.findIndex(inv => inv.id === id);
    if (inventoryIndex === -1) {
      return res.status(404).json({ error: 'Inventory not found' });
    }

    const inventory = db.inventories[inventoryIndex];
    
    // Check edit access
    const hasAccess = req.user.role === 'admin' || 
                     inventory.createdBy === req.user.id || 
                     inventory.access.editors.includes(req.user.id);

    if (!hasAccess) {
      return res.status(403).json({ error: 'Access denied' });
    }

    // Update inventory
    db.inventories[inventoryIndex] = {
      ...inventory,
      ...updates,
      id, // Preserve ID
      createdBy: inventory.createdBy, // Preserve creator
      createdAt: inventory.createdAt // Preserve creation date
    };

    await writeJsonData(db);
    res.json(db.inventories[inventoryIndex]);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update inventory' });
  }
});

// Delete inventory (authenticated + access check)
router.delete('/:id', authMiddleware, async (req, res) => {
  try {
    const { id } = req.params;
    const db = await readJsonData();
    
    const inventoryIndex = db.inventories.findIndex(inv => inv.id === id);
    if (inventoryIndex === -1) {
      return res.status(404).json({ error: 'Inventory not found' });
    }

    const inventory = db.inventories[inventoryIndex];
    
    // Check delete access (admin or creator only)
    const hasAccess = req.user.role === 'admin' || inventory.createdBy === req.user.id;

    if (!hasAccess) {
      return res.status(403).json({ error: 'Access denied' });
    }

    // Remove inventory and its items
    db.inventories.splice(inventoryIndex, 1);
    db.items = db.items.filter(item => item.inventoryId !== id);
    db.discussions = db.discussions.filter(disc => disc.inventoryId !== id);

    await writeJsonData(db);
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete inventory' });
  }
});

module.exports = router;