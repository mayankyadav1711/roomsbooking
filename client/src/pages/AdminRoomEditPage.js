import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import { fetchRooms, addRoom, updateRoomAvailability } from '../features/rooms/roomSlice';
import AdminRoomForm from '../components/AdminRoomForm';
import Loader from '../components/Loader';

const AdminRoomEditPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { rooms, loading, error } = useSelector((state) => state.rooms);

  useEffect(() => {
    if (id !== 'new' && rooms.length === 0) {
      dispatch(fetchRooms());
    }
  }, [dispatch, id, rooms]);

  const room = id === 'new' ? null : rooms.find((r) => r._id === id);

  const handleSubmit = async (roomData) => {
    try {
      if (id === 'new') {
        await dispatch(addRoom(roomData)).unwrap();
      } else {
        await dispatch(updateRoomAvailability({ roomId: id, availabilityData: roomData })).unwrap();
      }
      navigate('/admin/rooms');
    } catch (err) {
      console.error('Failed to save the room:', err);
    }
  };

  if (loading) return <Loader />;
  if (error) return <div className="text-red-600">{error}</div>;
  if (id !== 'new' && !room) return <div>Room not found</div>;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="container mx-auto px-4 py-8"
    >
      <h1 className="text-3xl font-bold mb-8">{id === 'new' ? 'Add New Room' : `Edit Room: ${room.name}`}</h1>
      <AdminRoomForm room={room} onSubmit={handleSubmit} />
    </motion.div>
  );
};

export default AdminRoomEditPage;