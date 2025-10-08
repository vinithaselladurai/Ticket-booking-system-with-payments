const Payment = require('../models/Payment');
const Booking = require('../models/Booking');

exports.makePayment = async (req, res) => {
  try {
    const { bookingId, amount } = req.body;
    const booking = await Booking.findById(bookingId);
    if (!booking) return res.status(404).json({ message: 'Booking not found' });

    // Mock payment algorithm: always success
    const payment = await Payment.create({
      bookingId,
      userId: req.user.id,
      amount,
      status: 'Success'
    });

    booking.status = 'Confirmed';
    await booking.save();

    res.json({ message: 'Payment successful', payment, booking });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
