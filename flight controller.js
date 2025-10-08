const Flight = require('../models/Flight');

exports.listFlights = async (req, res) => {
  try {
    const { from, to, date } = req.query;
    const flights = await Flight.find({
      from,
      to,
      departureDate: { $gte: new Date(date), $lte: new Date(date + 'T23:59:59') },
      seatsAvailable: { $gt: 0 }
    });
    res.json(flights);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.bookFlight = async (req, res) => {
  const { flightId } = req.body;
  try {
    const flight = await Flight.findById(flightId);
    if (!flight || flight.seatsAvailable <= 0)
      return res.status(400).json({ message: 'Flight not available' });

    flight.seatsAvailable -= 1;
    await flight.save();

    res.json({ message: 'Flight booked', flight });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
