const { readJsonData } = require('../utils/jsonUtils');

// Check if user has read access to inventory
const checkReadAccess = async (req, res, next) => {
  try {
    const { id: inventoryId } = req.params;
    const db = await readJsonData();
    
    const inventory = db.inventories.find(inv => inv.id === inventoryId);
    if (!inventory) {
      return res.status(404).json({ error: 'Inventory not found' });
    }
    
    // Admins have full access
    if (req.user.role === 'admin') {
      req.inventory = inventory;
      return next();
    }
    
    // Check if user has explicit read access or if inventory is public
    const hasAccess = inventory.access.readers.includes('*') || 
                     inventory.access.readers.includes(req.user.id) ||
                     inventory.access.editors.includes(req.user.id) ||
                     inventory.createdBy === req.user.id;
                     
    if (!hasAccess) {
      return res.status(403).json({ error: 'Access denied' });
    }
    
    req.inventory = inventory;
    next();
  } catch (error) {
    res.status(500).json({ error: 'Failed to check access' });
  }
};

// Check if user has write access to inventory
const checkWriteAccess = async (req, res, next) => {
  try {
    const { id: inventoryId } = req.params;
    const db = await readJsonData();
    
    const inventory = db.inventories.find(inv => inv.id === inventoryId);
    if (!inventory) {
      return res.status(404).json({ error: 'Inventory not found' });
    }
    
    // Admins have full access
    if (req.user.role === 'admin') {
      req.inventory = inventory;
      return next();
    }
    
    // Check if user has explicit write access or is the creator
    const hasAccess = inventory.access.editors.includes(req.user.id) ||
                     inventory.createdBy === req.user.id;
                     
    if (!hasAccess) {
      return res.status(403).json({ error: 'Write access denied' });
    }
    
    req.inventory = inventory;
    next();
  } catch (error) {
    res.status(500).json({ error: 'Failed to check access' });
  }
};

module.exports = {
  checkReadAccess,
  checkWriteAccess
};