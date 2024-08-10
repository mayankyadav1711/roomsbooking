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
  const { name, seatCapacity, tags, availability } = req.body;

  try {
    const room = await Room.findById(roomId);

    if (!room) {
      return res.status(404).json({ message: 'Room not found' });
    }

    // Update basic room info
    room.name = name;
    room.seatCapacity = seatCapacity;
    room.tags = tags;

    // Update availability
    room.availability = availability.map(item => ({
      date: new Date(item.date + 'T00:00:00Z'),
      timeSlots: item.timeSlots
    }));

    const updatedRoom = await room.save();
    res.json(updatedRoom);
  } catch (error) {
    console.error('Error updating room:', error);
    res.status(500).json({ message: 'Error updating room', error: error.message });
  }
};

module.exports = { addRoom, getRooms, updateRoomAvailability };