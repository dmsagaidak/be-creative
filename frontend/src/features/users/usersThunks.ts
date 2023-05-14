import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  GlobalError,
  LoginMutation,
  RegisterMutation,
  RegisterResponse,
  UpdateUserMutation,
  User,
  ValidationError
} from '../../types';
import axiosApi from '../../axiosApi';
import { isAxiosError } from 'axios';

interface SearchParam {
  organization?: string;
}

export const fetchUsers = createAsyncThunk<User[], SearchParam | undefined>(
  'users/fetch',
  async (params) => {
    const queryString =
      params &&
      Object.entries(params)
        .filter(([_, value]) => value !== undefined)
        .map(([key, value]) => `${key}=${value}`)
        .join('&');

    const url = `/users${queryString ? `?${queryString}` : ''}`;

    const response = await axiosApi.get<User[]>(url);
    return response.data;
  }
)

export const findUserById = createAsyncThunk<User, string>(
  'users/findById',
  async (id) => {
    const response = await axiosApi.get('/users/' + id);
    return response.data;
  }
);

export const register = createAsyncThunk<User, RegisterMutation, { rejectValue: ValidationError }>(
  'users/register',
  async (registerMutation, { rejectWithValue }) => {
    try {
      const formData = new FormData();
      const keys = Object.keys(registerMutation) as (keyof RegisterMutation)[];
      keys.forEach((key) => {
        const value = registerMutation[key];
        if (value !== null) {
          formData.append(key, value);
        }
      });
      const response = await axiosApi.post('/users', formData);
      return response.data;
    } catch (e) {
      if (isAxiosError(e) && e.response && e.response.status === 400) {
        return rejectWithValue(e.response.data as ValidationError);
      }
      throw e;
    }
  },
);

export const login = createAsyncThunk<User, LoginMutation, { rejectValue: GlobalError }>(
  'users/login',
  async (loginMutation, { rejectWithValue }) => {
    try {
      const response = await axiosApi.post<RegisterResponse>('/users/sessions', loginMutation);
      return response.data.user;
    } catch (e) {
      if (isAxiosError(e) && e.response && e.response.status === 400) {
        return rejectWithValue(e.response.data as GlobalError);
      }
      throw e;
    }
  },
);

export const googleLogin = createAsyncThunk<User, string, { rejectValue: GlobalError }>(
  'users/googleLogin',
  async (credential, { rejectWithValue }) => {
    try {
      const response = await axiosApi.post<RegisterResponse>('/users/google', { credential });
      return response.data.user;
    } catch (e) {
      if (isAxiosError(e) && e.response && e.response.status === 400) {
        return rejectWithValue(e.response.data as GlobalError);
      }
      throw e;
    }
  },
);

export const logout = createAsyncThunk('users/logout', async () => {
  await axiosApi.delete('/users/sessions');
});

export const updateUser = createAsyncThunk<void, {id: string, userMutation: UpdateUserMutation},  { rejectValue: ValidationError }>(
  '/users/update',
  async ({id, userMutation}, {rejectWithValue}) => {
    try{
      const formData = new FormData();
      const keys = Object.keys(userMutation) as (keyof UpdateUserMutation)[];
      keys.forEach((key) => {
        const value = userMutation[key];
        if (value !== null) {
          formData.append(key, value);
        }
      });

      await axiosApi.patch('/users/' + id, formData);
    }catch (e) {
      if (isAxiosError(e) && e.response && e.response.status === 400) {
        return rejectWithValue(e.response.data as ValidationError);
      }
      throw e;
    }
  }
)

