import { IPost } from '../../types';
import { createSlice } from '@reduxjs/toolkit';
import { addPostThunk, fetchPostsThunk } from './PostsThunk.ts';

interface PostsState {
  posts: IPost[] | null;
  fetchingPosts: boolean;
  addingPost: boolean;
}

const initialState: PostsState = {
  posts: null,
  fetchingPosts: false,
  addingPost: false,
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

    builder
      .addCase(addPostThunk.pending, (state) => {
        state.addingPost = true;
      })
      .addCase(addPostThunk.fulfilled, (state) => {
        state.addingPost = false;
      })
      .addCase(addPostThunk.rejected, (state) => {
        state.addingPost = false;
      });
  },
  selectors: {
    selectPosts: (state) => state.posts,
    selectFetchingPosts: (state) => state.fetchingPosts,
    selectAddingPost: (state) => state.addingPost,
  },
});

export const postsReducer = postsSlice.reducer;
export const { selectPosts, selectFetchingPosts, selectAddingPost } = postsSlice.selectors;
