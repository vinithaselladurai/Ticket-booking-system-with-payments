import React from 'react';
import { Link } from 'react-router-dom';

export default function Navbar() {
  const logout = () => {
    localStorage.removeItem('accessToken');
    window.location.href = '/login';
  };

  return (
    <nav className="bg-blue-600 text-white p-4 flex justify-between">
      <div className="font-bold text-xl">TravelMate</div>
      <div className="space-x-4">
        <Link to="/dashboard">Dashboard</Link>
        <Link to="/flights">Flights</Link>
        <Link to="/hotels">Hotels</Link>
        <Link to="/bookings">Bookings</Link>
        <button onClick={logout}>Logout</button>
      </div>
    </nav>
  );
}
