import { IPost } from '../../types';
import { createSlice } from '@reduxjs/toolkit';
import { fetchPostsThunk } from './PostsThunk.ts';

interface PostsState {
  posts: IPost[] | null;
  fetchingPosts: boolean;
}

const initialState: PostsState = {
  posts: null,
  fetchingPosts: false,
};

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPostsThunk.pending, (state) => {
        state.fetchingPosts = true;
      })
      .addCase(fetchPostsThunk.fulfilled, (state, { payload: posts }) => {
        state.fetchingPosts = false;
        state.posts = posts;
      })
      .addCase(fetchPostsThunk.rejected, (state) => {
        state.fetchingPosts = false;
      });
  },
  selectors: {
    selectPosts: (state) => state.posts,
    selectFetchingPosts: (state) => state.fetchingPosts,
  },
});

export const postsReducer = postsSlice.reducer;
export const { selectPosts, selectFetchingPosts } = postsSlice.selectors;
