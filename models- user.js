const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  passwordHash: String,
  preferences: {
    seat: { type: String, default: 'Any' },
    hotelType: { type: String, default: 'Any' }
  }
});

module.exports = mongoose.model('User', userSchema);
