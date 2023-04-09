import { createSlice } from '@reduxjs/toolkit';
import { createProject, fetchProjectsByUser } from './projectsThunks';
import { RootState } from '../../app/store';
import { Project } from '../../types';

interface ProjectsState {
  items: Project[];
  fetchLoading: boolean;
  createLoading: boolean;
}

const initialState: ProjectsState = {
  items: [],
  fetchLoading: false,
  createLoading: false,
};

const projectsSlice = createSlice({
  name: 'projects',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchProjectsByUser.pending, (state) => {
      state.fetchLoading = true;
    });
    builder.addCase(fetchProjectsByUser.fulfilled, (state, {payload}) => {
      state.fetchLoading = false;
      state.items = payload;
    });
    builder.addCase(fetchProjectsByUser.rejected, (state) => {
      state.fetchLoading = false;
    });
    builder.addCase(createProject.pending, (state) => {
      state.createLoading = true;
    });
    builder.addCase(createProject.fulfilled, (state) => {
      state.createLoading = false;
    });
    builder.addCase(createProject.rejected, (state) => {
      state.createLoading = false;
    });
  }
});

export const projectsReducer = projectsSlice.reducer;

export const selectProjects = (state: RootState) => state.projects.items;
export const selectProjectsFetching = (state: RootState) => state.projects.fetchLoading;
export const selectProjectCreating = (state: RootState) => state.projects.createLoading;

