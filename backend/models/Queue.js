// backend/models/Queue.js
const mongoose = require('mongoose');

const queueSchema = new mongoose.Schema({
  department: String,
  token: String,
  status: { type: String, default: 'waiting' }
});

module.exports = mongoose.model('Queue', queueSchema);
