const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
  type: {
    type: String,
    required: true,
    enum: ['Lost', 'Found']
  },
  title: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true,
    trim: true
  },
  category: {
    type: String,
    required: true,
    trim: true
  },
  location: {
    type: String,
    required: true,
    trim: true
  },
  date: {
    type: Date,
    required: true,
    default: Date.now
  },
  image: {
    type: String,
    default: ''
  },
  status: {
    type: String,
    enum: ['Active', 'Resolved', 'Deleted'],
    default: 'Active'
  },
  email: {
    type: String,
    required: true,
    default: 'joyiiestjoy@gmail.com' // Hardcoded for now
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Item', itemSchema);