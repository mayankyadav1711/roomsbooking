import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import { fetchBookings } from '../features/booking/bookingSlice';
import Loader from '../components/Loader';
import { FaCalendar, FaClock } from 'react-icons/fa';

const BookingsPage = () => {
  const dispatch = useDispatch();
  const { bookings, loading, error } = useSelector((state) => state.bookings);

  useEffect(() => {
    dispatch(fetchBookings());
  }, [dispatch]);

  if (loading) return <Loader />;
  if (error) return <div className="text-red-600">{error}</div>;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="container mx-auto px-4 py-8"
    >
      <h1 className="text-3xl font-bold mb-8">My Bookings</h1>
      {bookings.length === 0 ? (
        <p>You have no bookings yet.</p>
      ) : (
        <div className="grid gap-6">
          {bookings.map((booking) => (
            <div key={booking._id} className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-xl font-semibold mb-4">{booking.room.name}</h2>
              <p className="flex items-center mb-2">
                <FaCalendar className="mr-2 text-gray-600" />
                <span>{new Date(booking.date).toLocaleDateString()}</span>
              </p>
              <p className="flex items-center">
                <FaClock className="mr-2 text-gray-600" />
                <span>{booking.timeSlot.start} - {booking.timeSlot.end}</span>
              </p>
            </div>
          ))}
        </div>
      )}
    </motion.div>
  );
};

export default BookingsPage;