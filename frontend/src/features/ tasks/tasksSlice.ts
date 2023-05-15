import { Task } from '../../types';
import { createSlice } from '@reduxjs/toolkit';
import { createTask, fetchOneTask, fetchTasksByProject, fetchTasksByUser, removeTask, updateTask } from './tasksThunks';
import { RootState } from '../../app/store';

interface TaskState {
  items: Task[];
  oneItem: Task | null;
  fetchLoading: boolean;
  fetchOneLoading: boolean;
  createLoading: boolean;
  deleteLoading: false | string;
  updateLoading: boolean;
}

const initialState: TaskState = {
  items: [],
  oneItem: null,
  fetchLoading: false,
  fetchOneLoading: false,
  createLoading: false,
  deleteLoading: false,
  updateLoading: false
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
    builder.addCase(fetchTasksByUser.pending, (state) => {
      state.fetchLoading = true;
    });
    builder.addCase(fetchTasksByUser.fulfilled, (state, {payload}) => {
      state.fetchLoading = false;
      state.items = payload;
    });
    builder.addCase(fetchTasksByUser.rejected, (state) => {
      state.fetchLoading = false;
    });
    builder.addCase(fetchOneTask.pending, (state) => {
      state.fetchOneLoading = true;
    });
    builder.addCase(fetchOneTask.fulfilled, (state, {payload}) => {
      state.fetchOneLoading = false;
      state.oneItem = payload;
    });
    builder.addCase(fetchOneTask.rejected, (state) => {
      state.fetchOneLoading = false;
    });
    builder.addCase(createTask.pending, (state) => {
      state.createLoading = true;
    });
    builder.addCase(createTask.fulfilled, (state) => {
      state.createLoading = false;
    });
    builder.addCase(createTask.rejected, (state) => {
      state.createLoading = false;
    });
    builder.addCase(removeTask.pending, (state, {meta: {arg: taskId}}) => {
      state.deleteLoading = taskId;
    });
    builder.addCase(removeTask.fulfilled, (state) => {
      state.deleteLoading = false;
    });
    builder.addCase(removeTask.rejected, (state) => {
      state.deleteLoading = false;
    });
    builder.addCase(updateTask.pending, (state) => {
      state.updateLoading = true;
    });
    builder.addCase(updateTask.fulfilled, (state) => {
      state.updateLoading = false;
    });
    builder.addCase(updateTask.rejected, (state) => {
      state.updateLoading = false;
    })
   },
});

export const tasksReducer = tasksSlice.reducer;

export const selectTasks = (state: RootState) => state.tasks.items;
export const selectTasksFetching = (state: RootState) => state.tasks.fetchLoading;
export const selectOneTask = (state: RootState) => state.tasks.oneItem;
export const selectOneTaskFetching = (state: RootState) => state.tasks.fetchOneLoading;
export const selectTaskCreating = (state: RootState) => state.tasks.createLoading;
export const selectTaskDeleting = (state: RootState) => state.tasks.deleteLoading;
export const selectTaskUpdating = (state: RootState) => state.tasks.updateLoading;

