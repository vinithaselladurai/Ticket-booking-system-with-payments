const mongoose = require('mongoose');

const flightSchema = new mongoose.Schema({
  airline: String,
  from: String,
  to: String,
  departureDate: Date,
  arrivalDate: Date,
  price: Number,
  seatsAvailable: Number
});

module.exports = mongoose.model('Flight', flightSchema);
