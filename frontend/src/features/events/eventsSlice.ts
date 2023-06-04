import { Event, ValidationError } from '../../types';
import { createSlice } from '@reduxjs/toolkit';
import { createEvent, fetchEvents, fetchOneEvent, removeEvent, updateEvent } from './eventsThunks';
import { RootState } from '../../app/store';

interface EventState {
  items: Event[];
  oneItem: Event | null;
  fetchLoading: boolean;
  fetchOneLoading: boolean;
  createLoading: boolean;
  deleteLoading: false | string;
  updateLoading: boolean;
  creatingError: ValidationError | null;
  updatingError: ValidationError | null;
}

const initialState: EventState = {
  items: [],
  oneItem: null,
  fetchLoading: false,
  fetchOneLoading: false,
  createLoading: false,
  deleteLoading: false,
  updateLoading: false,
  creatingError: null,
  updatingError: null,
};

export const eventsSlice = createSlice({
  name: 'events',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchEvents.pending, (state) => {
      state.fetchLoading = true;
    });
    builder.addCase(fetchEvents.fulfilled, (state, { payload }) => {
      state.fetchLoading = false;
      state.items = payload;
    });
    builder.addCase(fetchEvents.rejected, (state) => {
      state.fetchLoading = false;
    });
    builder.addCase(fetchOneEvent.pending, (state) => {
      state.fetchOneLoading = true;
    });
    builder.addCase(fetchOneEvent.fulfilled, (state, { payload }) => {
      state.fetchOneLoading = false;
      state.oneItem = payload;
    });
    builder.addCase(fetchOneEvent.rejected, (state) => {
      state.fetchOneLoading = false;
    });
    builder.addCase(createEvent.pending, (state) => {
      state.createLoading = true;
    });
    builder.addCase(createEvent.fulfilled, (state) => {
      state.createLoading = false;
    });
    builder.addCase(createEvent.rejected, (state, { payload: error }) => {
      state.createLoading = false;
      state.creatingError = error || null;
    });
    builder.addCase(removeEvent.pending, (state, { meta: { arg: eventId } }) => {
      state.deleteLoading = eventId;
    });
    builder.addCase(removeEvent.fulfilled, (state) => {
      state.deleteLoading = false;
    });
    builder.addCase(removeEvent.rejected, (state) => {
      state.deleteLoading = false;
    });
    builder.addCase(updateEvent.pending, (state) => {
      state.updateLoading = true;
    });
    builder.addCase(updateEvent.fulfilled, (state) => {
      state.updateLoading = false;
    });
    builder.addCase(updateEvent.rejected, (state, { payload: error }) => {
      state.updateLoading = false;
      state.updatingError = error || null;
    });
  },
});

export const eventsReducer = eventsSlice.reducer;

export const selectEvents = (state: RootState) => state.events.items;
export const selectOneEvent = (state: RootState) => state.events.oneItem;
export const selectEventsFetching = (state: RootState) => state.events.fetchLoading;
export const selectOneEventFetching = (state: RootState) => state.events.fetchOneLoading;
export const selectEventCreating = (state: RootState) => state.events.createLoading;
export const selectEventDeleting = (state: RootState) => state.events.deleteLoading;
export const selectEventUpdating = (state: RootState) => state.events.updateLoading;
export const selectEventCreatingError = (state: RootState) => state.events.creatingError;
export const selectEventUpdatingError = (state: RootState) => state.events.updatingError;
