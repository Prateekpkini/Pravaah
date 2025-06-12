// backend/models/Queue.js
const mongoose = require('mongoose');

const queueSchema = new mongoose.Schema({
  token: {
    type: String,
    required: true,
    unique: true
  },
  chamber: {
    type: String,
    required: true
  },
  department: {
    type: String,
    required: true
  },
  status: {
    type: String,
    enum: ['Waiting', 'In Progress', 'Completed'],
    default: 'Waiting'
  }
}, { timestamps: true });

module.exports = mongoose.model('Queue', queueSchema);
