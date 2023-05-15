import { createSlice } from '@reduxjs/toolkit';
import {
  createProject,
  fetchOneProject,
  fetchProjectsByUser,
  removeProject,
  updateProject
} from './projectsThunks';
import { RootState } from '../../app/store';
import { Project, ValidationError } from '../../types';

interface ProjectsState {
  items: Project[];
  oneItem: Project | null;
  fetchLoading: boolean;
  fetchOneLoading: boolean;
  createLoading: boolean;
  deleteLoading: false | string;
  updateLoading: boolean;
  createProjectError: ValidationError | null;
  updateProjectError: ValidationError | null;
}

const initialState: ProjectsState = {
  items: [],
  oneItem: null,
  fetchLoading: false,
  fetchOneLoading: false,
  createLoading: false,
  deleteLoading: false,
  updateLoading: false,
  createProjectError: null,
  updateProjectError: null,
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
      state.createProjectError = null;
      state.createLoading = true;
    });
    builder.addCase(createProject.fulfilled, (state) => {
      state.createLoading = false;
    });
    builder.addCase(createProject.rejected, (state, {payload: error}) => {
      state.createProjectError = error || null;
      state.createLoading = false;
    });
    builder.addCase(removeProject.pending, (state, {meta: {arg: projectId}}) => {
      state.deleteLoading = projectId;
    });
    builder.addCase(removeProject.fulfilled, (state) => {
      state.deleteLoading = false;
    });
    builder.addCase(removeProject.rejected, (state) => {
      state.deleteLoading = false;
    });
    builder.addCase(updateProject.pending, (state) => {
      state.updateProjectError = null;
      state.updateLoading = true;
    });
    builder.addCase(updateProject.fulfilled, (state) => {
      state.updateLoading = false;
    });
    builder.addCase(updateProject.rejected, (state, {payload: error}) => {
      state.updateLoading = false;
      state.updateProjectError = error || null;
    });
  }
});

export const projectsReducer = projectsSlice.reducer;

export const selectProjects = (state: RootState) => state.projects.items;
export const selectOneProject = (state: RootState) => state.projects.oneItem;
export const selectProjectsFetching = (state: RootState) => state.projects.fetchLoading;
export const selectProjectCreating = (state: RootState) => state.projects.createLoading;
export const selectOneProjectFetching = (state: RootState) => state.projects.fetchOneLoading;
export const selectProjectRemoving = (state: RootState) => state.projects.deleteLoading;
export const selectProjectUpdating = (state: RootState) => state.projects.updateLoading;
export const selectProjectCreateError = (state: RootState) => state.projects.createProjectError;
export const selectProjectUpdateError = (state: RootState) => state.projects.updateProjectError;


