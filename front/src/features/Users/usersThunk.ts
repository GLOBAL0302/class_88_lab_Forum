import { createAsyncThunk } from '@reduxjs/toolkit';
import { IGlobalError, ILoginMutation, IRegisterResponse, IUser, IValidationError } from '../../types';
import { axiosApi } from '../../axiosApi.ts';
import { isAxiosError } from 'axios';
import { RootState } from '../../app/store.ts';

export const signUpUserThunk = createAsyncThunk<IRegisterResponse, ILoginMutation, { rejectValue: IValidationError }>(
  'signUpUserThunk',
  async (registerMutation, { rejectWithValue }) => {
    try {
      const response = await axiosApi.post<IRegisterResponse>('/users/register', registerMutation);
      return response.data;
    } catch (error) {
      if (isAxiosError(error) && error.response && error.response.status === 400) {
        return rejectWithValue(error.response.data);
      }
      throw error;
    }
  },
);

export const signInUserThunk = createAsyncThunk<IUser, ILoginMutation, { rejectValue: IGlobalError }>(
  'signInUserThunk',
  async (loginMutation, { rejectWithValue }) => {
    try {
      const response = await axiosApi.post<IRegisterResponse>('/users/sessions', loginMutation);
      return response.data.user;
    } catch (error) {
      if (isAxiosError(error) && error.response && error.response.status === 400) {
        return rejectWithValue(error.response.data as IGlobalError);
      }
      throw error;
    }
  },
);

export const logOutUserThunk = createAsyncThunk<void, void, { state: RootState }>(
  'logOutUserThunk',
  async (_, { getState }) => {
    const token = getState().users.user?.token;
    await axiosApi.delete('/users/sessions', { headers: { authorization: token } });
  },
);
