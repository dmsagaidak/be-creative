import { createAsyncThunk } from '@reduxjs/toolkit';
import { GlobalError, Project, ProjectMutation, ValidationError } from '../../types';
import axiosApi from '../../axiosApi';
import { isAxiosError } from 'axios';

export const fetchProjectsByUser = createAsyncThunk<Project[], string>('projects/fetchAll', async (id) => {
  const response = await axiosApi.get('/projects?user=' + id);
  return response.data;
});

export const fetchProjectByParticipant = createAsyncThunk<Project[], string>(
  'projects/fetchByParticipant',
  async (id) => {
    const response = await axiosApi.get(`/projects?participant=${id}`);
    return response.data;
  },
);

export const fetchOneProject = createAsyncThunk<Project, string>('projects/fetchOne', async (id) => {
  const response = await axiosApi.get(`/projects/${id}`);
  return response.data;
});

export const createProject = createAsyncThunk<void, { project: ProjectMutation }, { rejectValue: ValidationError }>(
  'projects/create',
  async ({ project }, { rejectWithValue }) => {
    try {
      const formData = new FormData();
      const keys = Object.keys(project) as (keyof ProjectMutation)[];
      keys.forEach((key) => {
        const value = project[key];
        if (value !== null) {
          if (key === 'participants') {
            formData.append(key, JSON.stringify(value));
          } else {
            formData.append(key, value as File | string);
          }
        }
      });

      await axiosApi.post('/projects/', formData);
    } catch (e) {
      if (isAxiosError(e) && e.response && e.response.status === 400) {
        return rejectWithValue(e.response.data as ValidationError);
      }
      throw e;
    }
  },
);

export const removeProject = createAsyncThunk<void, string, { rejectValue: GlobalError }>(
  'projects/remove',
  async (id, { rejectWithValue }) => {
    try {
      await axiosApi.delete(`/projects/${id}`);
    } catch (e) {
      if (isAxiosError(e) && e.response && e.response.status === 400) {
        return rejectWithValue(e.response.data as GlobalError);
      }
      throw e;
    }
  },
);

export const updateProject = createAsyncThunk<
  void,
  { id: string; project: ProjectMutation },
  { rejectValue: ValidationError }
>('projects/update', async ({ id, project }, { rejectWithValue }) => {
  try {
    const formData = new FormData();
    const keys = Object.keys(project) as (keyof ProjectMutation)[];
    keys.forEach((key) => {
      const value = project[key];
      if (value !== null) {
        if (key === 'participants') {
          formData.append(key, JSON.stringify(value));
        } else {
          formData.append(key, value as File | string);
        }
      }
    });

    await axiosApi.put(`/projects/${id}`, formData);
  } catch (e) {
    if (isAxiosError(e) && e.response && e.response.status === 400) {
      return rejectWithValue(e.response.data as ValidationError);
    }
    throw e;
  }
});
