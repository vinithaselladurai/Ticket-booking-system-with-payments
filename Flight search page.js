import React, { useState } from 'react';
import API from '../api/api';

export default function Flights() {
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');
  const [date, setDate] = useState('');
  const [flights, setFlights] = useState([]);

  const searchFlights = async () => {
    const res = await API.get(/flights?from=${from}&to=${to}&date=${date});
    setFlights(res.data);
  };

  const bookFlight = async (id) => {
    const res = await API.post('/bookings', { type: 'flight', itemId: id });
    const payment = await API.post('/payments', { bookingId: res.data.booking._id, amount: res.data.booking.totalPrice });
    alert(Flight booked! Payment status: ${payment.data.payment.status});
  };

  return (
    <div className="p-4">
      <h2 className="text-xl mb-2">Search Flights</h2>
      <input placeholder="From" value={from} onChange={e => setFrom(e.target.value)} className="border p-2 mr-2" />
      <input placeholder="To" value={to} onChange={e => setTo(e.target.value)} className="border p-2 mr-2" />
      <input type="date" value={date} onChange={e => setDate(e.target.value)} className="border p-2 mr-2" />
      <button className="bg-blue-600 text-white p-2" onClick={searchFlights}>Search</button>

      <div className="mt-4">
        {flights.map(f => (
          <div key={f._id} className="border p-2 mb-2 flex justify-between">
            <span>{f.airline} | {f.from} → {f.to} | ${f.price}</span>
            <button className="bg-green-500 text-white p-1" onClick={() => bookFlight(f._id)}>Book</button>
          </div>
        ))}
      </div>
    </div>
  );
}
