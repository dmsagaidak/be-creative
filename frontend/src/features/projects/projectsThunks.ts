import { createAsyncThunk } from '@reduxjs/toolkit';
import { ParticipantMutation, Project, ProjectMutation, ValidationError } from '../../types';
import axiosApi from '../../axiosApi';
import { isAxiosError } from 'axios';

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

export const createProject = createAsyncThunk<void, {project: ProjectMutation, participants: ParticipantMutation[]}, {rejectValue: ValidationError}>(
  'projects/create',
  async ({project, participants}, {rejectWithValue}) => {
    try{
      const formData = new FormData();
      const keys = Object.keys(project) as (keyof ProjectMutation)[];
      keys.forEach((key) => {
        const value = project[key];
        if(value !== null) {
          formData.append(key, value)
        }
      });

      participants.forEach((participant) => {
        formData.append('participants[]', JSON.stringify(participant))
      });

      await axiosApi.post('/projects/', formData);
    }catch (e) {
      if (isAxiosError(e) && e.response && e.response.status === 400) {
        return rejectWithValue(e.response.data as ValidationError);
      }
      throw e;
    }
  });

export const removeProject = createAsyncThunk<void, string>(
  'projects/remove',
  async (id) => {
    await axiosApi.delete(`/projects/${id}`);
  }
);

export const updateProject = createAsyncThunk<
  void,
  {id: string; project: ProjectMutation; participants: ParticipantMutation[]},
  { rejectValue: ValidationError }
>(
  'projects/update',
  async ({id, project, participants}, { rejectWithValue }) => {
    try{
      const formData = new FormData();
      const keys = Object.keys(project) as (keyof ProjectMutation)[];
      keys.forEach((key) => {
        const value = project[key];
        if(value !== null) {
          formData.append(key, value)
        }
      });

      participants.forEach((participant) => {
        formData.append('participants[]', JSON.stringify(participant))
      });

      await axiosApi.put('/projects/' + id, formData);

    }catch (e) {
      if (isAxiosError(e) && e.response && e.response.status === 400) {
        return rejectWithValue(e.response.data as ValidationError);
      }
      throw e;
    }
  }

)