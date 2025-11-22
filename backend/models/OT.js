const mongoose = require('mongoose');

const otSchema = new mongoose.Schema({
  room: { type: String, required: true },
  status: { type: String, required: true, enum: ['Scheduled', 'In Use', 'Available'] },
  patient: { type: String },
});

module.exports = mongoose.model('OT', otSchema);
