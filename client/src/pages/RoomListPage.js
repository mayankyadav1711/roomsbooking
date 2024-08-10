import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import { fetchRooms } from '../features/rooms/roomSlice';
import RoomCard from '../components/RoomCard';
import Loader from '../components/Loader';
import { FaSearch } from 'react-icons/fa';

const RoomListPage = () => {
  const dispatch = useDispatch();
  const { rooms, loading, error } = useSelector((state) => state.rooms);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredRooms, setFilteredRooms] = useState([]);

  useEffect(() => {
    dispatch(fetchRooms());
  }, [dispatch]);

  useEffect(() => {
    setFilteredRooms(rooms);
  }, [rooms]);

  const handleSearch = (e) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);

    const filtered = rooms.filter(room => 
      room.name.toLowerCase().includes(term) ||
      room.tags.some(tag => tag.toLowerCase().includes(term)) ||
      room.seatCapacity.toString().includes(term)
    );

    setFilteredRooms(filtered);
  };

  if (loading) return <Loader />;
  if (error) return <div className="text-red-600">{error}</div>;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="container mx-auto px-4 py-8"
    >
      <h1 className="text-3xl font-bold mb-8">Available Rooms</h1>
      <div className="mb-6 relative">
        <input
          type="text"
          placeholder="Search rooms..."
          value={searchTerm}
          onChange={handleSearch}
          className="w-full px-4 py-2 pl-10 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <FaSearch className="absolute left-3 top-3 text-gray-400" />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredRooms.map((room) => (
          <RoomCard key={room._id} room={room} />
        ))}
      </div>
      {filteredRooms.length === 0 && (
        <p className="text-center text-gray-500 mt-8">No rooms found matching your search criteria.</p>
      )}
    </motion.div>
  );
};

export default RoomListPage;