import { Event } from '../../types'
import { createSlice } from '@reduxjs/toolkit';
import { createEvent, fetchEvents, removeEvent } from './eventsThunks';
import { RootState } from '../../app/store';

interface EventState {
  items: Event[];
  fetchLoading: boolean;
  createLoading: boolean;
  deleteLoading: false | string;
}

const initialState: EventState = {
  items: [],
  fetchLoading: false,
  createLoading: false,
  deleteLoading: false,
};

export const eventsSlice = createSlice({
  name: 'events',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchEvents.pending, (state) => {
      state.fetchLoading = true;
    });
    builder.addCase(fetchEvents.fulfilled, (state, {payload}) => {
      state.fetchLoading = false;
      state.items = payload;
    });
    builder.addCase(fetchEvents.rejected, (state) => {
      state.fetchLoading = false;
    });
    builder.addCase(createEvent.pending, (state) => {
      state.createLoading = true;
    });
    builder.addCase(createEvent.fulfilled, (state) => {
      state.createLoading = false;
    });
    builder.addCase(createEvent.rejected, (state) => {
      state.createLoading = false;
    });
    builder.addCase(removeEvent.pending, (state, {meta: {arg: eventId}}) => {
      state.deleteLoading = eventId;
    });
    builder.addCase(removeEvent.fulfilled, (state) => {
      state.deleteLoading = false;
    });
    builder.addCase(removeEvent.rejected, (state) => {
      state.deleteLoading = false;
    });
  }
});

export const eventsReducer = eventsSlice.reducer;

export const selectEvents = (state: RootState) => state.events.items;