// backend/routes/queueRoutes.js
const express = require('express');
const Queue = require('../models/Queue');

const router = express.Router();

// Get all tokens
router.get('/', async (req, res) => {
  try {
    const queues = await Queue.find().sort({ createdAt: -1 });
    res.json(queues);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching queues' });
  }
});

// Add new token
router.post('/', async (req, res) => {
  try {
    const { token, chamber, department, status } = req.body;
    const newQueue = new Queue({ token, chamber, department, status });
    await newQueue.save();
    req.io.emit('queue-update');
    res.status(201).json(newQueue);
  } catch (error) {
    res.status(400).json({ error: 'Error adding token' });
  }
});

// Update token status
router.put('/:id', async (req, res) => {
  try {
    const updatedQueue = await Queue.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    req.io.emit('queue-update');
    res.json(updatedQueue);
  } catch (error) {
    res.status(400).json({ error: 'Error updating token' });
  }
});

// Delete token
router.delete('/:id', async (req, res) => {
  try {
    await Queue.findByIdAndDelete(req.params.id);
    req.io.emit('queue-update');
    res.json({ message: 'Token removed' });
  } catch (error) {
    res.status(500).json({ error: 'Error deleting token' });
  }
});

module.exports = router;

