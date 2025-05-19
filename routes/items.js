const express = require('express');
const router = express.Router();
const Item = require('../models/Item');

// Get all items
router.get('/', async (req, res) => {
  try {
    const items = await Item.find().populate('category supplier');
    res.json(items);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Create new item
router.post('/', async (req, res) => {
  const item = new Item({
    name: req.body.name,
    description: req.body.description,
    category: req.body.category,
    supplier: req.body.supplier,
    price: req.body.price,
    cost: req.body.cost,
    quantity: req.body.quantity,
    reorderLevel: req.body.reorderLevel,
    sku: req.body.sku,
    barcode: req.body.barcode
  });

  try {
    const newItem = await item.save();
    res.status(201).json(newItem);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Add more routes for update, delete, etc.

module.exports = router;