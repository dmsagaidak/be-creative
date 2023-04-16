import { createAsyncThunk } from '@reduxjs/toolkit';
import { ParticipantMutation, Project, ProjectMutation } from '../../types';
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

export const createProject = createAsyncThunk<void, {project: ProjectMutation, participants: ParticipantMutation[]}>(
  'projects/create',
  async ({project, participants}) => {
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
  }
);

export const removeProject = createAsyncThunk<void, string>(
  'projects/remove',
  async (id) => {
    await axiosApi.delete(`/projects/${id}`);
  }
);