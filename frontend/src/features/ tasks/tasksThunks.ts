import { createAsyncThunk } from '@reduxjs/toolkit';
import { Task, TaskMutation } from '../../types';
import axiosApi from '../../axiosApi';

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
)