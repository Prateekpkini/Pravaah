const express = require('express');
const router = express.Router();
const OT = require('../models/OT');

// Get all OT statuses
router.get('/', async (req, res) => {
  try {
    const ots = await OT.find();
    res.json(ots);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Update OT status
router.put('/:id', async (req, res) => {
  try {
    const updatedOT = await OT.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedOT);
    // Emit a socket event to notify clients of the update
    req.io.emit('ot-update', updatedOT);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;
