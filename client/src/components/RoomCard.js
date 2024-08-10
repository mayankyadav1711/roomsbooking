import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaUser, FaTag } from 'react-icons/fa';

const RoomCard = ({ room }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="bg-white rounded-lg shadow-md overflow-hidden"
    >
      <img src={`https://i.ibb.co/NrJBCgV/2177.jpg,${room.name}`} alt={room.name} className="w-full h-48 object-cover" />
      <div className="p-4">
        <h2 className="text-xl font-semibold mb-2">{room.name}</h2>
        <div className="flex items-center mb-2">
          <FaUser className="mr-2 text-gray-600" />
          <span>{room.seatCapacity} seats</span>
        </div>
        <div className="flex flex-wrap mb-4">
          {room.tags.map((tag, index) => (
            <span key={index} className="bg-blue-100 text-blue-800 text-xs font-semibold mr-2 mb-2 px-2.5 py-0.5 rounded flex items-center">
              <FaTag className="mr-1" /> {tag}
            </span>
          ))}
        </div>
        <Link to={`/rooms/${room._id}`} className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition duration-300">
          View Details
        </Link>
      </div>
    </motion.div>
  );
};

export default RoomCard;