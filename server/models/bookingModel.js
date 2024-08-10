const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  room: { type: mongoose.Schema.Types.ObjectId, ref: 'Room', required: true },
  date: { type: Date, required: true },
  timeSlot: {
    start: { type: String, required: true },
    end: { type: String, required: true },
  },
}, { timestamps: true });

const Booking = mongoose.model('Booking', bookingSchema);
module.exports = Booking;