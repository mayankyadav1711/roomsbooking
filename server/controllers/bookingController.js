const Booking = require('../models/bookingModel');
const Room = require('../models/roomModel');

const createBooking = async (req, res) => {
  const { roomId, date, timeSlot } = req.body;

  try {
    const room = await Room.findById(roomId);

    if (!room) {
      return res.status(404).json({ message: 'Room not found' });
    }

    const bookingDate = new Date(date);
    bookingDate.setUTCHours(0, 0, 0, 0);

    const availabilityIndex = room.availability.findIndex(
      (a) => a.date.toISOString().split('T')[0] === bookingDate.toISOString().split('T')[0]
    );

    if (availabilityIndex === -1) {
      return res.status(400).json({ message: 'No availability for the selected date' });
    }

    const timeSlotIndex = room.availability[availabilityIndex].timeSlots.findIndex(
      (ts) => ts.start === timeSlot.start && ts.end === timeSlot.end && !ts.isBooked
    );

    if (timeSlotIndex === -1) {
      return res.status(400).json({ message: 'Time slot is not available' });
    }

    room.availability[availabilityIndex].timeSlots[timeSlotIndex].isBooked = true;
    await room.save();

    const booking = new Booking({
      user: req.user._id,
      room: roomId,
      date: bookingDate,
      timeSlot: {
        start: timeSlot.start,
        end: timeSlot.end
      },
    });

    const createdBooking = await booking.save();
    res.status(201).json(createdBooking);

  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

const getBookings = async (req, res) => {
  const bookings = await Booking.find({ user: req.user._id }).populate('room', 'name');
  res.json(bookings);
};

module.exports = { createBooking, getBookings };    