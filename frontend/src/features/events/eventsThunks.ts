import { createAsyncThunk } from '@reduxjs/toolkit';
import { Event, EventMutation } from '../../types';
import axiosApi from '../../axiosApi';

export const fetchEvents = createAsyncThunk<Event[]>(
  'events/fetchAll',
  async () => {
    const response = await axiosApi.get('/events');
    return response.data;
  }
);

export const createEvent = createAsyncThunk<void, EventMutation>(
  'events/create',
  async (eventMutation) => {
    await axiosApi.post('/events/', eventMutation);
  }
);