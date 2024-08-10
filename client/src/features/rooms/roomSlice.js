import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../utils/api';

export const fetchRooms = createAsyncThunk('rooms/fetchRooms', async () => {
  const response = await api.get('/api/rooms');
  return response.data;
});

export const addRoom = createAsyncThunk('rooms/addRoom', async (roomData) => {
  const response = await api.post('/api/rooms', roomData);
  return response.data;
});

export const updateRoomAvailability = createAsyncThunk(
  'rooms/updateRoomAvailability',
  async ({ roomId, availabilityData }) => {
    const response = await api.put(`/api/rooms/${roomId}/availability`, availabilityData);
    return response.data;
  }
);

const roomSlice = createSlice({
  name: 'rooms',
  initialState: {
    rooms: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchRooms.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchRooms.fulfilled, (state, action) => {
        state.loading = false;
        state.rooms = action.payload;
      })
      .addCase(fetchRooms.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(addRoom.fulfilled, (state, action) => {
        state.rooms.push(action.payload);
      })
      .addCase(updateRoomAvailability.fulfilled, (state, action) => {
        const index = state.rooms.findIndex((room) => room._id === action.payload._id);
        if (index !== -1) {
          state.rooms[index] = action.payload;
        }
      });
  },
});

export default roomSlice.reducer;