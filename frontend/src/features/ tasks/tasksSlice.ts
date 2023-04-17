import { Task } from '../../types';
import { createSlice } from '@reduxjs/toolkit';
import { fetchTasksByProject } from './tasksThunks';
import { RootState } from '../../app/store';

interface TaskState {
  items: Task[];
  oneItem: Task | null;
  fetchLoading: boolean;
}

const initialState: TaskState = {
  items: [],
  oneItem: null,
  fetchLoading: false,
}

export const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchTasksByProject.pending, (state) => {
      state.fetchLoading = true;
    });
    builder.addCase(fetchTasksByProject.fulfilled, (state, {payload}) => {
      state.fetchLoading = false;
      state.items = payload;
    });
    builder.addCase(fetchTasksByProject.rejected, (state) => {
      state.fetchLoading = false;
    });
  }
  });

export const tasksReducer = tasksSlice.reducer;

export const selectTasks = (state: RootState) => state.tasks.items;
export const selectTasksFetching = (state: RootState) => state.tasks.fetchLoading;

