import { createAsyncThunk } from '@reduxjs/toolkit';
import { axiosApi } from '../../axiosApi.ts';
import { IPost } from '../../types';

export const fetchPostsThunk = createAsyncThunk<IPost[], void>('Posts/fetchPostsThunk', async () => {
  const { data } = await axiosApi.get('/posts');
  return data;
});

export const addNewPosts = createAsyncThunk('Posts/addNewPosts', async () => {});
