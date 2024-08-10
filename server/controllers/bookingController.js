const Booking = require('../models/bookingModel');
const Room = require('../models/roomModel');

const createBooking = async (req, res) => {
  const { roomId, date, timeSlot } = req.body;

  const room = await Room.findById(roomId);

  if (room) {
    const availabilityIndex = room.availability.findIndex(
      (a) => a.date.toISOString().split('T')[0] === new Date(date).toISOString().split('T')[0]
    );

    if (availabilityIndex > -1) {
      const timeSlotIndex = room.availability[availabilityIndex].timeSlots.findIndex(
        (ts) => ts.start === timeSlot.start && ts.end === timeSlot.end
      );

      if (timeSlotIndex > -1 && !room.availability[availabilityIndex].timeSlots[timeSlotIndex].isBooked) {
        room.availability[availabilityIndex].timeSlots[timeSlotIndex].isBooked = true;
        await room.save();

        const booking = new Booking({
          user: req.user._id,
          room: roomId,
          date,
          timeSlot,
        });

        const createdBooking = await booking.save();
        res.status(201).json(createdBooking);
      } else {
        res.status(400);
        throw new Error('Time slot is not available');
      }
    } else {
      res.status(400);
      throw new Error('No availability for the selected date');
    }
  } else {
    res.status(404);
    throw new Error('Room not found');
  }
};

const getBookings = async (req, res) => {
  const bookings = await Booking.find({ user: req.user._id }).populate('room', 'name');
  res.json(bookings);
};

module.exports = { createBooking, getBookings };    