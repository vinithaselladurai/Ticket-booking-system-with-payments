const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  type: { type: String, enum: ['flight', 'hotel'] },
  itemId: { type: mongoose.Schema.Types.ObjectId },
  bookingDate: { type: Date, default: Date.now },
  status: { type: String, enum: ['Pending', 'Confirmed', 'Cancelled'], default: 'Pending' },
  totalPrice: Number
});

module.exports = mongoose.model('Booking', bookingSchema);
