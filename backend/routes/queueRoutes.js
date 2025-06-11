// backend/routes/queueRoutes.js
const express = require('express');
const Queue = require('../models/Queue');

const router = express.Router();

module.exports = (io) => {
  router.get('/', async (req, res) => {
    const queues = await Queue.find();
    res.json(queues);
  });

  router.post('/', async (req, res) => {
    const queue = new Queue(req.body);
    await queue.save();
    io.emit('queue-update');
    res.json(queue);
  });

  router.patch('/:id', async (req, res) => {
    const queue = await Queue.findByIdAndUpdate(req.params.id, req.body, { new: true });
    io.emit('queue-update');
    res.json(queue);
  });

  return router;
};
