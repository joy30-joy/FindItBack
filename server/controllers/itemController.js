const Item = require('../models/Item');
const { validationResult } = require('express-validator');

// Create a new item
exports.createItem = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        message: 'Validation failed',
        errors: errors.array()
      });
    }

    const { type, title, description, category, location } = req.body;
    
    // Normalize image path
    const image = req.file ? req.file.path.replace(/\\/g, '/') : '';

    const newItem = new Item({
      type,
      title,
      description,
      category,
      location,
      image
    });

    await newItem.save();
    res.status(201).json({
      ...newItem.toObject(),
      message: 'Item created successfully!'
    });
  } catch (error) {
    console.error('❌ Error creating item:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Get all items
exports.getAllItems = async (req, res) => {
  try {
    const { status, search } = req.query;
    const query = { status: { $ne: 'Deleted' } };

    if (status && status !== 'All') query.status = status;
    if (search) {
      const regex = new RegExp(search, 'i');
      query.$or = [
        { title: regex },
        { description: regex },
        { location: regex },
        { category: regex }
      ];
    }

    const items = await Item.find(query).sort({ createdAt: -1 });
    res.json(items);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Mark item as resolved
exports.resolveItem = async (req, res) => {
  try {
    const item = await Item.findById(req.params.id);
    if (!item) return res.status(404).json({ message: 'Item not found' });

    item.status = 'Resolved';
    await item.save();
    res.json(item);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Soft delete item
exports.softDeleteItem = async (req, res) => {
  try {
    const item = await Item.findById(req.params.id);
    if (!item) return res.status(404).json({ message: 'Item not found' });

    item.status = 'Deleted';
    await item.save();
    res.json({ message: 'Item deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};