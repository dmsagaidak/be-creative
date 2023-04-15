import { createAsyncThunk } from '@reduxjs/toolkit';
import { Project, ProjectMutation } from '../../types';
import axiosApi from '../../axiosApi';

export const fetchProjectsByUser = createAsyncThunk<Project[], string>(
  'projects/fetchAll',
  async (id) => {
    const response = await axiosApi.get('/projects?user=' + id);
    return response.data;
  }
);

export const fetchOneProject = createAsyncThunk<Project, string>(
  'projects/fetchOne',
  async (id) => {
    const response = await axiosApi.get(`/projects/${id}`);
    return response.data;
  }
);

export const createProject = createAsyncThunk<void, ProjectMutation>(
  'projects/create',
  async (mutation) => {
    await axiosApi.post('/projects', mutation);
  }
);

export const removeProject = createAsyncThunk<void, string>(
  'projects/remove',
  async (id) => {
    await axiosApi.delete(`/projects/${id}`);
  }
);