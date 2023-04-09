import { createSlice } from '@reduxjs/toolkit';
import { createProject } from './projectsThunks';
import { RootState } from '../../app/store';

interface ProjectsState {
  createLoading: boolean;
}

const initialState: ProjectsState = {
  createLoading: false,
};

const projectsSlice = createSlice({
  name: 'projects',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
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

export const selectProjectCreating = (state: RootState) => state.projects.createLoading;

