const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String },
  category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category' },
  supplier: { type: mongoose.Schema.Types.ObjectId, ref: 'Supplier' },
  price: { type: Number, required: true },
  cost: { type: Number, required: true },
  quantity: { type: Number, required: true, default: 0 },
  reorderLevel: { type: Number, default: 5 },
  sku: { type: String, unique: true },
  barcode: { type: String },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Item', itemSchema);