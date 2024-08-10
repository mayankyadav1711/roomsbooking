import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaSearch, FaCalendar } from 'react-icons/fa';

const HomePage = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="container mx-auto px-4 py-8"
    >
      <h1 className="text-4xl font-bold mb-8 text-center">Welcome to Room Booking</h1>
      <div className="grid md:grid-cols-2 gap-8">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-4 flex items-center">
            <FaSearch className="mr-2 text-blue-600" /> Find a Room
          </h2>
          <p className="mb-4">Browse our selection of available rooms and find the perfect space for your needs.</p>
          <Link to="/rooms" className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition duration-300">
            View Rooms
          </Link>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-4 flex items-center">
            <FaCalendar className="mr-2 text-blue-600" /> Manage Bookings
          </h2>
          <p className="mb-4">View and manage your room bookings in one convenient place.</p>
          <Link to="/bookings" className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition duration-300">
            My Bookings
          </Link>
        </div>
      </div>
    </motion.div>
  );
};

export default HomePage;