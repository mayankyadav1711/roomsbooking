import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { createBooking } from '../features/booking/bookingSlice';
import { FaCalendar } from 'react-icons/fa';
import { useNavigate } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const BookingForm = ({ room }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  // Set initial selectedDate to noon UTC of today
  const today = new Date();
  today.setUTCHours(12, 0, 0, 0);
  
  const [selectedDate, setSelectedDate] = useState(today);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState(null);
  const [availableDates, setAvailableDates] = useState([]);
  const [availableTimeSlots, setAvailableTimeSlots] = useState([]);

  useEffect(() => {
    if (room && room.availability) {
      const dates = room.availability.map(a => new Date(a.date));
      setAvailableDates(dates);
    }
  }, [room]);

  useEffect(() => {
    if (selectedDate && room && room.availability) {
      const selectedDateString = selectedDate.toISOString().split('T')[0];
      const selectedAvailability = room.availability.find(a => 
        new Date(a.date).toISOString().split('T')[0] === selectedDateString
      );
      if (selectedAvailability) {
        setAvailableTimeSlots(selectedAvailability.timeSlots);
      } else {
        setAvailableTimeSlots([]);
      }
    }
  }, [selectedDate, room]);

  const handleDateChange = (date) => {
    const adjustedDate = new Date(date);
    adjustedDate.setUTCHours(12, 0, 0, 0);
    setSelectedDate(adjustedDate);
    setSelectedTimeSlot(null);
  };

  const handleTimeSlotClick = (timeSlot) => {
    if (!timeSlot.isBooked) {
      setSelectedTimeSlot(timeSlot);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (selectedTimeSlot) {
      const bookingDate = new Date(selectedDate);
      bookingDate.setUTCHours(0, 0, 0, 0);
      
      dispatch(createBooking({
        roomId: room._id,
        date: bookingDate.toISOString(),
        timeSlot: {
          start: selectedTimeSlot.start,
          end: selectedTimeSlot.end
        }
      }));
    }
    navigate('/');
  };

  return (
    <form onSubmit={handleSubmit} className="mt-4">
      <div className="mb-4">
        <label htmlFor="date" className="block mb-2 text-sm font-medium text-gray-700">
          <FaCalendar className="inline mr-2" />
          Date
        </label>
        <DatePicker
          id="date"
          selected={selectedDate}
          onChange={handleDateChange}
          includeDates={availableDates}
          dateFormat="MMMM d, yyyy"
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block mb-2 text-sm font-medium text-gray-700">Time Slots</label>
        {availableTimeSlots.length > 0 ? (
          <div className="flex flex-wrap gap-2">
            {availableTimeSlots.map((slot, index) => (
              <button
                key={index}
                type="button"
                onClick={() => handleTimeSlotClick(slot)}
                className={`px-3 py-1 rounded-full text-sm font-medium ${
                  slot.isBooked
                    ? 'bg-red-100 text-red-800 cursor-not-allowed'
                    : slot === selectedTimeSlot
                    ? 'bg-green-500 text-white'
                    : 'bg-green-100 text-green-800 hover:bg-green-200'
                }`}
                disabled={slot.isBooked}
              >
                {slot.start} - {slot.end}
              </button>
            ))}
          </div>
        ) : (
          <p className="text-red-600">No time slots available for this date.</p>
        )}
      </div>
      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition duration-300 disabled:bg-gray-400 disabled:cursor-not-allowed"
        disabled={!selectedDate || !selectedTimeSlot}
      >
        Book Room
      </button>
    </form>
  );
};

export default BookingForm;