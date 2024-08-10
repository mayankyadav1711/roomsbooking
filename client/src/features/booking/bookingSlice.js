import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../utils/api';

export const createBooking = createAsyncThunk('bookings/createBooking', async (bookingData) => {
  const response = await api.post('/api/bookings', bookingData);
  return response.data;
});

export const fetchBookings = createAsyncThunk('bookings/fetchBookings', async () => {
  const response = await api.get('/api/bookings');
  return response.data;
});

const bookingSlice = createSlice({
  name: 'bookings',
  initialState: {
    bookings: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createBooking.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createBooking.fulfilled, (state, action) => {
        state.loading = false;
        state.bookings.push(action.payload);
      })
      .addCase(createBooking.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(fetchBookings.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchBookings.fulfilled, (state, action) => {
        state.loading = false;
        state.bookings = action.payload;
      })
      .addCase(fetchBookings.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default bookingSlice.reducer;