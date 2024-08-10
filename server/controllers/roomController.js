const Room = require('../models/roomModel');

const addRoom = async (req, res) => {
  const { name, tags, seatCapacity, availability } = req.body;

  const room = new Room({
    name,
    tags,
    seatCapacity,
    availability,
  });

  const createdRoom = await room.save();
  res.status(201).json(createdRoom);
};

const getRooms = async (req, res) => {
  const rooms = await Room.find({});
  res.json(rooms);
};

const updateRoomAvailability = async (req, res) => {
  const { roomId } = req.params;
  const { date, timeSlots } = req.body;

  const room = await Room.findById(roomId);

  if (room) {
    const availabilityIndex = room.availability.findIndex(
      (a) => a.date.toISOString().split('T')[0] === new Date(date).toISOString().split('T')[0]
    );

    if (availabilityIndex > -1) {
      room.availability[availabilityIndex].timeSlots = timeSlots;
    } else {
      room.availability.push({ date, timeSlots });
    }

    const updatedRoom = await room.save();
    res.json(updatedRoom);
  } else {
    res.status(404);
    throw new Error('Room not found');
  }
};

module.exports = { addRoom, getRooms, updateRoomAvailability };