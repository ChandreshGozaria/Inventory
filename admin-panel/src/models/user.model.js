// src/models/User.js
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true, match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/ },
  password: { type: String, required: true },
  role: { type: String, enum: ['admin', 'client'], default: 'client' } // Role-based access control
});

const User = mongoose.model('User', userSchema);

module.exports = User;
