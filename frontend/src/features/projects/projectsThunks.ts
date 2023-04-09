import { createAsyncThunk } from '@reduxjs/toolkit';
import { Project, ProjectMutation } from '../../types';
import axiosApi from '../../axiosApi';

export const fetchProjectsByUser = createAsyncThunk<Project[], string>(
  'projects/fetchAll',
  async (id) => {
    const response = await axiosApi.get('/projects?user=' + id);
    return response.data;
  }
)

export const createProject = createAsyncThunk<void, ProjectMutation>(
  'projects/create',
  async (mutation) => {
    await axiosApi.post('/projects', mutation);
  }
);