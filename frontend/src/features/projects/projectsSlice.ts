import { createSlice } from '@reduxjs/toolkit';
import { createProject, fetchOneProject, fetchProjectsByUser } from './projectsThunks';
import { RootState } from '../../app/store';
import { Project } from '../../types';

interface ProjectsState {
  items: Project[];
  oneItem: Project | null;
  fetchLoading: boolean;
  fetchOneLoading: boolean;
  createLoading: boolean;
}

const initialState: ProjectsState = {
  items: [],
  oneItem: null,
  fetchLoading: false,
  fetchOneLoading: false,
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
    builder.addCase(fetchOneProject.pending, (state) => {
      state.fetchOneLoading = true;
    });
    builder.addCase(fetchOneProject.fulfilled, (state, {payload}) => {
      state.fetchOneLoading = false;
      state.oneItem = payload;
    });
    builder.addCase(fetchOneProject.rejected, (state) => {
      state.fetchOneLoading = false;
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
export const selectOneProject = (state: RootState) => state.projects.oneItem;
export const selectProjectsFetching = (state: RootState) => state.projects.fetchLoading;
export const selectProjectCreating = (state: RootState) => state.projects.createLoading;
export const selectOneProjectFetching = (state: RootState) => state.projects.fetchOneLoading

