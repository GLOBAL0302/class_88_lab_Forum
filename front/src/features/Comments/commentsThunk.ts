import { createAsyncThunk } from '@reduxjs/toolkit';
import { IComments } from '../../types';
import { axiosApi } from '../../axiosApi.ts';
import { RootState } from '../../app/store.ts';

export const fetchComments = createAsyncThunk<IComments[], string, { state: RootState }>(
  'comments/fetchComments',
  async (postId, { getState }) => {
    const token = getState().users.user?.token;
    const { data } = await axiosApi.get(`/comments/${postId}`, { headers: { Authorization: token } });
    return data;
  },
);

export const addCommentsThunk = createAsyncThunk<
  void,
  { postId: string | null; description: string },
  { state: RootState }
>('comments/addCommentsThunk', async (newComment, { getState }) => {
  const token = getState().users.user?.token;
  const description = newComment.description;
  await axiosApi.post(`/comments/${newComment.postId}`, { description }, { headers: { Authorization: token } });
});
