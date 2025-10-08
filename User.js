const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { type: String, trim: true, default: '' },
  email: { type: String, required: true, unique: true, lowercase: true, trim: true },
  passwordHash: { type: String, required: true },
  age: Number,
  gender: { type: String, enum: ['Male', 'Female', 'Other'], default: 'Other' },
  heightCm: Number,
  weightKg: Number,
  goal: { type: String, enum: ['Lose Weight','Maintain','Gain Muscle','Other'], default: 'Other' }
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);
