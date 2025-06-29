require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
const itemRoutes = require('./routes/itemRoutes');
const connectDB = require('./config/db');

const app = express();
const PORT = process.env.PORT || 5000;

// ======================
// Connect to MongoDB
// ======================
connectDB(); // from ./config/db.js

// ======================
// Middleware
// ======================
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ======================
// Serve static image files
// ======================
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// ======================
// API Routes
// ======================
app.use('/api/items', itemRoutes);

// ======================
// Error Handling Middleware
// ======================
app.use((err, req, res, next) => {
  console.error('Server Error:', err.stack);
  res.status(500).json({ message: 'Internal Server Error' });
});

// ======================
// Start Server
// ======================
app.listen(PORT, () => {
  console.log(` Server running on port ${PORT}`);
});
