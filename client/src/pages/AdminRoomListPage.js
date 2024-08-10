import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { fetchRooms } from '../features/rooms/roomSlice';
import Loader from '../components/Loader';
import { FaEdit, FaPlus } from 'react-icons/fa';

const AdminRoomListPage = () => {
  const dispatch = useDispatch();
  const { rooms, loading, error } = useSelector((state) => state.rooms);

  useEffect(() => {
    dispatch(fetchRooms());
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
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Admin Room Management</h1>
        <Link to="/admin/rooms/new" className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 transition duration-300 flex items-center">
          <FaPlus className="mr-2" /> Add New Room
        </Link>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full bg-white shadow-md rounded-lg">
          <thead className="bg-gray-200">
            <tr>
              <th className="px-4 py-2 text-left">Name</th>
              <th className="px-4 py-2 text-left">Capacity</th>
              <th className="px-4 py-2 text-left">Tags</th>
              <th className="px-4 py-2 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {rooms.map((room) => (
              <tr key={room._id} className="border-b">
                <td className="px-4 py-2">{room.name}</td>
                <td className="px-4 py-2">{room.seatCapacity}</td>
                <td className="px-4 py-2">{room.tags.join(', ')}</td>
                <td className="px-4 py-2">
                  <Link to={`/admin/rooms/${room._id}`} className="text-blue-600 hover:text-blue-800 mr-2">
                    <FaEdit />
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </motion.div>
  );
};

export default AdminRoomListPage;