import { createAsyncThunk } from '@reduxjs/toolkit';
import { Task } from '../../types';
import axiosApi from '../../axiosApi';

export const fetchTasksByProject = createAsyncThunk<Task[], string>('' +
  'tasks/fetchByProject',
  async (id) => {
    const response = await axiosApi.get(`/tasks?project=${id}`);
    return response.data;
  });