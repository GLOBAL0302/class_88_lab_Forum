import { IGlobalError, IUser, IValidationError } from '../../types';
import { createSlice } from '@reduxjs/toolkit';
import { signInUserThunk, signUpUserThunk } from './usersThunk.ts';

interface UsersState {
  user: IUser | null;
  registerLoading: boolean;
  registerError: IValidationError | null;
  loginLoading: boolean;
  loginError: IGlobalError | null;
}

const initialState: UsersState = {
  user: null,
  registerLoading: false,
  registerError: null,
  loginLoading: false,
  loginError: null,
};

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    unsetUser: (state) => {
      state.user = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(signInUserThunk.pending, (state) => {
        state.loginLoading = true;
      })
      .addCase(signInUserThunk.fulfilled, (state, { payload: user }) => {
        state.loginLoading = false;
        state.user = user;
      })
      .addCase(signInUserThunk.rejected, (state, { payload: error }) => {
        state.loginLoading = false;
        state.loginError = error || null;
      });

    builder
      .addCase(signUpUserThunk.pending, (state) => {
        state.registerLoading = true;
      })
      .addCase(signUpUserThunk.fulfilled, (state, { payload }) => {
        state.registerLoading = false;
        state.user = payload.user;
      })
      .addCase(signUpUserThunk.rejected, (state, { payload: error }) => {
        state.registerLoading = false;
        state.registerError = error || null;
      });
  },
  selectors: {
    selectUser: (state) => state.user,
    selectRegisterLoading: (state) => state.registerLoading,
    selectRegisterError: (state) => state.registerError,
    selectLoginLoading: (state) => state.loginLoading,
    selectLoginError: (state) => state.loginError,
  },
});

export const usersReducer = usersSlice.reducer;
export const { unsetUser } = usersSlice.actions;
export const { selectUser, selectRegisterError, selectRegisterLoading, selectLoginLoading, selectLoginError } =
  usersSlice.selectors;
