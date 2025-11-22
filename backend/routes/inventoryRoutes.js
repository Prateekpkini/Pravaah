const express = require('express');
const router = express.Router();
const Inventory = require('../models/Inventory');

// Get all inventory statuses
router.get('/', async (req, res) => {
  try {
    const inventories = await Inventory.find();
    res.json(inventories);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Update inventory status
router.put('/:id', async (req, res) => {
  try {
    const updatedInventory = await Inventory.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedInventory);
    // Emit a socket event to notify clients of the update
    req.io.emit('inventory-update', updatedInventory);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;
