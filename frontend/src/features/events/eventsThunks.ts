import { createAsyncThunk } from '@reduxjs/toolkit';
import { Event, EventMutation, ValidationError } from '../../types';
import axiosApi from '../../axiosApi';
import { isAxiosError } from 'axios';

export const fetchEvents = createAsyncThunk<Event[]>(
  'events/fetchAll',
  async () => {
    const response = await axiosApi.get('/events');
    return response.data;
  }
);

export const fetchOneEvent = createAsyncThunk<Event, string>(
  'events/fetchOne',
  async (id) => {
    const response = await axiosApi.get(`/events/${id}`);
    return response.data;
  }
);

export const createEvent = createAsyncThunk<void, EventMutation, {rejectValue: ValidationError}>(
  'events/create',
  async (eventMutation, {rejectWithValue}) => {
    try{
      await axiosApi.post('/events/', eventMutation);
    }catch (e) {
      if (isAxiosError(e) && e.response && e.response.status === 400) {
        return rejectWithValue(e.response.data as ValidationError);
      }
      throw e;
    }
  }
);

export const removeEvent = createAsyncThunk<void, string>(
  'events/remove',
  async (id) => {
    await axiosApi.delete(`/events/${id}`);
  }
);

export const updateEvent = createAsyncThunk<void, {id: string, event: EventMutation}, {rejectValue: ValidationError}>(
  'events/update',
  async({id, event}, {rejectWithValue}) => {
    try{
      await axiosApi.put(`/events/${id}`, event);
    }catch (e) {
      if (isAxiosError(e) && e.response && e.response.status === 400) {
        return rejectWithValue(e.response.data as ValidationError);
      }
      throw e;
    }
  }
);