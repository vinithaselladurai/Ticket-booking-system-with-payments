const mongoose = require('mongoose');

const tokenSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, index: true },
  token: { type: String, required: true },
  createdAt: { type: Date, default: Date.now, expires: '30d' } // optional TTL
});

module.exports = mongoose.model('Token', tokenSchema);
