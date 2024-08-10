import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import roomReducer from '../features/rooms/roomSlice';
import bookingReducer from '../features/booking/bookingSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    rooms: roomReducer,
    bookings: bookingReducer,
  },
});

export default store;