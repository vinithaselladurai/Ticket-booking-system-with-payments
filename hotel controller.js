const Hotel = require('../models/Hotel');

exports.listHotels = async (req, res) => {
  try {
    const { location } = req.query;
    const hotels = await Hotel.find({
      location,
      availableRooms: { $gt: 0 }
    });
    res.json(hotels);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.bookHotel = async (req, res) => {
  const { hotelId, nights } = req.body;
  try {
    const hotel = await Hotel.findById(hotelId);
    if (!hotel || hotel.availableRooms <= 0)
      return res.status(400).json({ message: 'Hotel not available' });

    hotel.availableRooms -= 1;
    await hotel.save();

    const totalPrice = nights * hotel.pricePerNight;
    res.json({ message: 'Hotel booked', hotel, totalPrice });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
