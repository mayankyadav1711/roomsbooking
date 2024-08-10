import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import { fetchRooms } from '../features/rooms/roomSlice';
import BookingForm from '../components/BookingForm';
import Loader from '../components/Loader';
import { FaUser, FaTag } from 'react-icons/fa';

const RoomDetailPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { rooms, loading, error } = useSelector((state) => state.rooms);

  useEffect(() => {
    if (rooms.length === 0) {
      dispatch(fetchRooms());
    }
  }, [dispatch, rooms]);

  const room = rooms.find((r) => r._id === id);

  if (loading) return <Loader />;
  if (error) return <div className="text-red-600">{error}</div>;
  if (!room) return <div>Room not found</div>;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="container mx-auto px-4 py-8"
    >
      <h1 className="text-3xl font-bold mb-8">{room.name}</h1>
      <div className="grid md:grid-cols-2 gap-8">
        <div>
          <img src={`https://i.ibb.co/NrJBCgV/2177.jpg,${room.name}`} alt={room.name} className="w-full h-64 object-cover rounded-lg shadow-md" />
          <div className="mt-4">
            <p className="flex items-center mb-2">
              <FaUser className="mr-2 text-gray-600" />
              <span>{room.seatCapacity} seats</span>
            </p>
            <div className="flex flex-wrap">
              {room.tags.map((tag, index) => (
                <span key={index} className="bg-blue-100 text-blue-800 text-xs font-semibold mr-2 mb-2 px-2.5 py-0.5 rounded flex items-center">
                  <FaTag className="mr-1" /> {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
        <div>
          <h2 className="text-2xl font-semibold mb-4">Book this room</h2>
          <BookingForm room={room} />
        </div>
      </div>
    </motion.div>
  );
};

export default RoomDetailPage;