import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { motion, AnimatePresence } from 'framer-motion';
import { fetchBookings } from '../features/booking/bookingSlice';
import Loader from '../components/Loader';
import { FaCalendar, FaClock, FaDoorOpen, FaChevronDown, FaChevronUp } from 'react-icons/fa';

const BookingsPage = () => {
  const dispatch = useDispatch();
  const { bookings, loading, error } = useSelector((state) => state.bookings);
  const [expandedBooking, setExpandedBooking] = useState(null);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    dispatch(fetchBookings());
  }, [dispatch]);

  const toggleExpand = (id) => {
    setExpandedBooking(expandedBooking === id ? null : id);
  };
// eslint-disable-next-line
  const filteredBookings = bookings.filter((booking) => {
    if (filter === 'all') return true;
    if (filter === 'upcoming') return new Date(booking.date) >= new Date();
    if (filter === 'past') return new Date(booking.date) < new Date();
  });

  const groupedBookings = filteredBookings.reduce((acc, booking) => {
    const date = new Date(booking.date).toLocaleDateString();
    if (!acc[date]) acc[date] = [];
    acc[date].push(booking);
    return acc;
  }, {});

  if (loading) return <Loader />;
  if (error) return <div className="text-red-600 text-center mt-8">{error}</div>;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="container mx-auto px-4 py-8 max-w-4xl"
    >
      <h1 className="text-4xl font-bold mb-8 text-center text-blue-700">My Bookings</h1>
      
      <div className="mb-6 flex justify-center space-x-4">
        <button
          onClick={() => setFilter('all')}
          className={`px-4 py-2 rounded-full ${filter === 'all' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700'}`}
        >
          All
        </button>
        <button
          onClick={() => setFilter('upcoming')}
          className={`px-4 py-2 rounded-full ${filter === 'upcoming' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700'}`}
        >
          Upcoming
        </button>
        <button
          onClick={() => setFilter('past')}
          className={`px-4 py-2 rounded-full ${filter === 'past' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700'}`}
        >
          Past
        </button>
      </div>

      {Object.keys(groupedBookings).length === 0 ? (
        <p className="text-center text-gray-600">You have no bookings in this category.</p>
      ) : (
        Object.entries(groupedBookings).map(([date, dateBookings]) => (
          <div key={date} className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-blue-600">{date}</h2>
            <div className="space-y-4">
              <AnimatePresence>
                {dateBookings.map((booking) => (
                  <motion.div
                    key={booking._id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300"
                  >
                    <div className="flex justify-between items-center cursor-pointer" onClick={() => toggleExpand(booking._id)}>
                      <h3 className="text-xl font-semibold text-blue-700">{booking.room.name}</h3>
                      {expandedBooking === booking._id ? <FaChevronUp className="text-gray-600" /> : <FaChevronDown className="text-gray-600" />}
                    </div>
                    
                    <div className={`mt-4 space-y-2 ${expandedBooking === booking._id ? 'block' : 'hidden'}`}>
                      <p className="flex items-center text-gray-700">
                        <FaCalendar className="mr-2 text-blue-600" />
                        <span>{new Date(booking.date).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</span>
                      </p>
                      <p className="flex items-center text-gray-700">
                        <FaClock className="mr-2 text-blue-600" />
                        <span>{booking.timeSlot.start} - {booking.timeSlot.end}</span>
                      </p>
                      <p className="flex items-center text-gray-700">
                        <FaDoorOpen className="mr-2 text-blue-600" />
                        <span>Room: {booking.room.name}</span>
                      </p>
                     
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </div>
        ))
      )}
    </motion.div>
  );
};

export default BookingsPage;