const mongoose = require('mongoose');

const timeSlotSchema = new mongoose.Schema({
  start: { type: String, required: true },
  end: { type: String, required: true },
  isBooked: { type: Boolean, default: false },
});

const availabilitySchema = new mongoose.Schema({
  date: { type: Date, required: true },
  timeSlots: [timeSlotSchema],
});

const roomSchema = new mongoose.Schema({
  name: { type: String, required: true },
  tags: [{ type: String }],
  seatCapacity: { type: Number, required: true },
  availability: [availabilitySchema],
}, { timestamps: true });

const Room = mongoose.model('Room', roomSchema);
module.exports = Room;