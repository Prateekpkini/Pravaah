const mongoose = require('mongoose');

const inventorySchema = new mongoose.Schema({
  drug: { type: String, required: true },
  stock: { type: Number, required: true, default: 0 },
});

module.exports = mongoose.model('Inventory', inventorySchema);
