import { createAsyncThunk } from '@reduxjs/toolkit';
import { Task, TaskMutation, ValidationError } from '../../types';
import axiosApi from '../../axiosApi';
import { isAxiosError } from 'axios';

export const fetchTasksByProject = createAsyncThunk<Task[], string>(
  'tasks/fetchByProject',
  async (id) => {
    const response = await axiosApi.get(`/tasks?project=${id}`);
    return response.data;
  });

export const fetchOneTask = createAsyncThunk<Task, string>(
  'tasks/fetchOne',
  async (id) => {
    const response = await axiosApi.get(`/tasks/${id}`);
    return response.data;
  }
);

export const createTask = createAsyncThunk<void, TaskMutation>(
  'tasks/create',
  async (taskMutation) => {
    await axiosApi.post('/tasks/', taskMutation);
  }
);

export const removeTask = createAsyncThunk<void, string>(
  'tasks/remove',
  async (id) => {
    await axiosApi.delete(`/tasks/${id}`);
  }
);

export const updateTask = createAsyncThunk<void, {id: string, task: TaskMutation}, { rejectValue: ValidationError }>(
  'tasks/edit',
  async ({id, task}, {rejectWithValue}) => {
    try{
      await axiosApi.put(`/tasks/${id}`, task);
    }catch (e) {
      if (isAxiosError(e) && e.response && e.response.status === 400) {
        return rejectWithValue(e.response.data as ValidationError);
      }
      throw e;
    }
  }

);