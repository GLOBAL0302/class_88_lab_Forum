import { createAsyncThunk } from '@reduxjs/toolkit';
import { axiosApi } from '../../axiosApi.ts';
import { IPost, IPostMutation } from '../../types';
import { RootState } from '../../app/store.ts';

export const fetchPostsThunk = createAsyncThunk<IPost[], void>('Posts/fetchPostsThunk', async () => {
  const { data } = await axiosApi.get('/posts');
  return data;
});

export const addPostThunk = createAsyncThunk<void, IPostMutation, { state: RootState }>(
  'Posts/addPostThunk',
  async (item, { getState }) => {
    const token = getState().users?.user?.token;
    const formData = new FormData();
    const keys = Object.keys(item) as (keyof IPostMutation)[];
    keys.forEach((key) => {
      const value = item[key];
      if (value !== null) {
        formData.append(key, value);
      }
    });
    await axiosApi.post('/posts', formData, { headers: { authorization: token } });
  },
);

export const addNewPosts = createAsyncThunk('Posts/addNewPosts', async () => {});
