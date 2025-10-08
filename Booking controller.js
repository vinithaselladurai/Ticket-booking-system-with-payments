const Booking = require('../models/Booking');
const Flight = require('../models/Flight');
const Hotel = require('../models/Hotel');

exports.createBooking = async (req, res) => {
  try {
    const { type, itemId, nights } = req.body;
    let totalPrice = 0;

    if (type === 'flight') {
      const flight = await Flight.findById(itemId);
      if (!flight || flight.seatsAvailable <= 0) return res.status(400).json({ message: 'Flight not available' });
      flight.seatsAvailable -= 1;
      await flight.save();
      totalPrice = flight.price;
    } else if (type === 'hotel') {
      const hotel = await Hotel.findById(itemId);
      if (!hotel || hotel.availableRooms <= 0) return res.status(400).json({ message: 'Hotel not available' });
      hotel.availableRooms -= 1;
      await hotel.save();
      totalPrice = nights * hotel.pricePerNight;
    }

    const booking = await Booking.create({
      userId: req.user.id,
      type,
      itemId,
      totalPrice,
      status: 'Pending'
    });

    res.json({ booking });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.listBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({ userId: req.user.id });
    res.json(bookings);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
