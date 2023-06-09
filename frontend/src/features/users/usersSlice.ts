import { GlobalError, User, ValidationError } from '../../types';
import { createSlice } from '@reduxjs/toolkit';
import {
  changePassword,
  fetchUsers,
  findUserById,
  googleLogin,
  login,
  logout,
  register,
  updateUser,
} from './usersThunks';
import { RootState } from '../../app/store';

interface UsersState {
  user: User | null;
  userById: User | null;
  users: User[];
  fetchLoading: boolean;
  fetchOneLoading: boolean;
  registerLoading: boolean;
  updateUserLoading: boolean;
  passwordChanging: boolean;
  passwordChangeError: GlobalError | null;
  updateUserError: ValidationError | null;
  registerError: ValidationError | null;
  loginLoading: boolean;
  loginError: GlobalError | null;
  logoutLoading: boolean;
}

const initialState: UsersState = {
  user: null,
  userById: null,
  users: [],
  fetchLoading: false,
  fetchOneLoading: false,
  registerLoading: false,
  updateUserLoading: false,
  passwordChanging: false,
  passwordChangeError: null,
  registerError: null,
  updateUserError: null,
  loginLoading: false,
  loginError: null,
  logoutLoading: false,
};

export const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchUsers.pending, (state) => {
      state.fetchLoading = true;
    });
    builder.addCase(fetchUsers.fulfilled, (state, { payload }) => {
      state.fetchLoading = false;
      state.users = payload;
    });
    builder.addCase(fetchUsers.rejected, (state) => {
      state.fetchLoading = false;
    });
    builder.addCase(findUserById.pending, (state) => {
      state.fetchLoading = true;
    });
    builder.addCase(findUserById.fulfilled, (state, { payload }) => {
      state.fetchLoading = false;
      state.userById = payload;
    });
    builder.addCase(findUserById.rejected, (state) => {
      state.fetchLoading = false;
    });
    builder.addCase(register.pending, (state) => {
      state.registerLoading = true;
      state.registerError = null;
    });
    builder.addCase(register.fulfilled, (state, { payload }) => {
      state.registerLoading = false;
      state.user = payload;
    });
    builder.addCase(register.rejected, (state, { payload }) => {
      state.registerLoading = false;
      state.registerError = payload || null;
    });
    builder.addCase(login.pending, (state) => {
      state.loginLoading = true;
      state.loginError = null;
    });
    builder.addCase(login.fulfilled, (state, { payload }) => {
      state.loginLoading = false;
      state.user = payload;
    });
    builder.addCase(login.rejected, (state, { payload: error }) => {
      state.loginLoading = false;
      state.loginError = error || null;
    });
    builder.addCase(googleLogin.pending, (state) => {
      state.loginLoading = true;
    });
    builder.addCase(googleLogin.fulfilled, (state, { payload: user }) => {
      state.loginLoading = false;
      state.user = user;
    });
    builder.addCase(googleLogin.rejected, (state, { payload: error }) => {
      state.loginLoading = false;
      state.loginError = error || null;
    });
    builder.addCase(logout.pending, (state) => {
      state.logoutLoading = true;
      state.user = null;
    });
    builder.addCase(logout.fulfilled, (state) => {
      state.logoutLoading = false;
    });
    builder.addCase(logout.rejected, (state) => {
      state.logoutLoading = false;
    });
    builder.addCase(updateUser.pending, (state) => {
      state.updateUserError = null;
      state.updateUserLoading = true;
    });
    builder.addCase(updateUser.fulfilled, (state) => {
      state.updateUserLoading = false;
    });
    builder.addCase(updateUser.rejected, (state, { payload: error }) => {
      state.updateUserError = error || null;
    });
    builder.addCase(changePassword.pending, (state) => {
      state.passwordChangeError = null;
      state.passwordChanging = true;
    });
    builder.addCase(changePassword.fulfilled, (state, { payload: user }) => {
      state.passwordChangeError = null;
      state.passwordChanging = false;
      state.user = user;
    });
    builder.addCase(changePassword.rejected, (state, { payload: error }) => {
      state.passwordChanging = false;
      state.passwordChangeError = error || null;
    });
  },
});

export const usersReducer = usersSlice.reducer;
export const selectUser = (state: RootState) => state.users.user;
export const selectUsers = (state: RootState) => state.users.users;
export const selectUserById = (state: RootState) => state.users.userById;
export const selectRegisterLoading = (state: RootState) => state.users.registerLoading;
export const selectRegisterError = (state: RootState) => state.users.registerError;
export const selectLoginLoading = (state: RootState) => state.users.loginLoading;
export const selectLoginError = (state: RootState) => state.users.loginError;
export const selectLogoutLoading = (state: RootState) => state.users.logoutLoading;
export const selectUpdateUserError = (state: RootState) => state.users.updateUserError;
export const selectPasswordChanging = (state: RootState) => state.users.passwordChanging;
export const selectPasswordChangeError = (state: RootState) => state.users.passwordChangeError;
