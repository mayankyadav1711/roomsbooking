import React, { useState, useEffect } from 'react';
import { FaPlus, FaMinus } from 'react-icons/fa';

const AdminRoomForm = ({ room, onSubmit }) => {
  const [name, setName] = useState('');
  const [seatCapacity, setSeatCapacity] = useState('');
  const [tags, setTags] = useState('');
  const [availability, setAvailability] = useState([]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toISOString().split('T')[0];
  };
  useEffect(() => {
    if (room) {
      setName(room.name);
      setSeatCapacity(room.seatCapacity);
      setTags(room.tags.join(', '));
      setAvailability(room.availability.map(item => ({
        ...item,
        date: formatDate(item.date)
      })) || []);
    }
  }, [room]);



  const handleSubmit = (e) => {
    e.preventDefault();
    const roomData = {
      name,
      seatCapacity: parseInt(seatCapacity),
      tags: tags.split(',').map(tag => tag.trim()),
      availability,
    };
    onSubmit(roomData);
  };

  const addAvailability = () => {
    setAvailability([...availability, { date: '', timeSlots: [] }]);
  };

  const removeAvailability = (index) => {
    const newAvailability = [...availability];
    newAvailability.splice(index, 1);
    setAvailability(newAvailability);
  };

  const updateAvailability = (index, field, value) => {
    const newAvailability = [...availability];
    newAvailability[index][field] = value;
    setAvailability(newAvailability);
  };

  const addTimeSlot = (availabilityIndex) => {
    const newAvailability = [...availability];
    newAvailability[availabilityIndex].timeSlots.push({ start: '', end: '' });
    setAvailability(newAvailability);
  };

  const removeTimeSlot = (availabilityIndex, timeSlotIndex) => {
    const newAvailability = [...availability];
    newAvailability[availabilityIndex].timeSlots.splice(timeSlotIndex, 1);
    setAvailability(newAvailability);
  };

  const updateTimeSlot = (availabilityIndex, timeSlotIndex, field, value) => {
    const newAvailability = [...availability];
    newAvailability[availabilityIndex].timeSlots[timeSlotIndex][field] = value;
    setAvailability(newAvailability);
  };


  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700">Room Name</label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
          required
        />
      </div>
      <div>
        <label htmlFor="seatCapacity" className="block text-sm font-medium text-gray-700">Seat Capacity</label>
        <input
          type="number"
          id="seatCapacity"
          value={seatCapacity}
          onChange={(e) => setSeatCapacity(e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
          required
        />
      </div>
      <div>
        <label htmlFor="tags" className="block text-sm font-medium text-gray-700">Tags (comma-separated)</label>
        <input
          type="text"
          id="tags"
          value={tags}
          onChange={(e) => setTags(e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
        />
      </div>
     <div>
        <label className="block text-sm font-medium text-gray-700">Availability</label>
        {availability.map((availabilityItem, availabilityIndex) => (
          <div key={availabilityIndex} className="mt-2 p-4 border rounded">
            <input
              type="date"
              value={availabilityItem.date}
              onChange={(e) => updateAvailability(availabilityIndex, 'date', e.target.value)}
              className="mb-2 rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
              required
            />
            {availabilityItem.timeSlots.map((slot, timeSlotIndex) => (
              <div key={timeSlotIndex} className="flex items-center space-x-2 mt-2">
                <input
                  type="time"
                  value={slot.start}
                  onChange={(e) => updateTimeSlot(availabilityIndex, timeSlotIndex, 'start', e.target.value)}
                  className="rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                />
                <span>to</span>
                <input
                  type="time"
                  value={slot.end}
                  onChange={(e) => updateTimeSlot(availabilityIndex, timeSlotIndex, 'end', e.target.value)}
                  className="rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                />
                <button type="button" onClick={() => removeTimeSlot(availabilityIndex, timeSlotIndex)} className="text-red-600 hover:text-red-800">
                  <FaMinus />
                </button>
              </div>
            ))}
            <button type="button" onClick={() => addTimeSlot(availabilityIndex)} className="mt-2 flex items-center text-blue-600 hover:text-blue-800">
              <FaPlus className="mr-1" /> Add Time Slot
            </button>
            <button type="button" onClick={() => removeAvailability(availabilityIndex)} className="mt-2 text-red-600 hover:text-red-800">
              Remove Date
            </button>
          </div>
        ))}
        <button type="button" onClick={addAvailability} className="mt-2 flex items-center text-blue-600 hover:text-blue-800">
          <FaPlus className="mr-1" /> Add Availability Date
        </button>
      </div>
      <button type="submit" className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition duration-300">
        {room ? 'Update Room' : 'Add Room'}
      </button>
    </form>
  );
};

export default AdminRoomForm;