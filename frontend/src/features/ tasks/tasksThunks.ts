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

export const fetchTasksByUser = createAsyncThunk<Task[], string>(
  'tasks/fetchByUser',
  async (id) => {
    const response = await axiosApi.get(`/tasks?user=${id}`);
    return response.data;
  });

export const fetchOneTask = createAsyncThunk<Task, string>(
  'tasks/fetchOne',
  async (id) => {
    const response = await axiosApi.get(`/tasks/${id}`);
    return response.data;
  }
);

export const createTask = createAsyncThunk<void, TaskMutation, {rejectValue: ValidationError}>(
  'tasks/create',
  async (taskMutation, {rejectWithValue}) => {
    try{
      const formData = new FormData();
      const keys = Object.keys(taskMutation) as (keyof TaskMutation)[];
      keys.forEach((key) => {
        const value = taskMutation[key];

        if(value !== null){
          formData.append(key, value);
        }
      });
      await axiosApi.post('/tasks/', formData);
    }catch (e) {
      if (isAxiosError(e) && e.response && e.response.status === 400) {
        return rejectWithValue(e.response.data as ValidationError);
      }
      throw e;
    }
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
      const formData = new FormData();
      const keys = Object.keys(task) as (keyof TaskMutation)[];
      keys.forEach((key) => {
        const value = task[key];

        if(value !== null){
          formData.append(key, value);
        }
      });

      await axiosApi.put(`/tasks/${id}`, formData);
    }catch (e) {
      if (isAxiosError(e) && e.response && e.response.status === 400) {
        return rejectWithValue(e.response.data as ValidationError);
      }
      throw e;
    }
  });

export const taskToggleStatus = createAsyncThunk<void, Task>(
  'tasks/toggleStatus',
  async (task) => {
    try{
      await axiosApi.patch(`/tasks/${task._id}/toggleStatus`, task);
    }catch (e) {
      console.log(e);
    }
  }
)
