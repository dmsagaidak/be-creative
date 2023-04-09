import { createAsyncThunk } from '@reduxjs/toolkit';
import { ProjectMutation } from '../../types';
import axiosApi from '../../axiosApi';

export const createProject = createAsyncThunk<void, ProjectMutation>(
  'projects/create',
  async (mutation) => {
    await axiosApi.post('/projects', mutation);
  }
)