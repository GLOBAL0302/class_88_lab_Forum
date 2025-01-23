import { IComments } from '../../types';
import { createSlice } from '@reduxjs/toolkit';
import { fetchComments } from './commentsThunk.ts';

interface commentsState {
  comments: IComments[] | null;
  fetchingComments: boolean;
  postingComment: boolean;
}

const initialState: commentsState = {
  comments: null,
  fetchingComments: false,
  postingComment: false,
};

const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchComments.pending, (state) => {
        state.fetchingComments = true;
      })
      .addCase(fetchComments.fulfilled, (state, { payload }) => {
        state.fetchingComments = false;
        state.comments = payload;
      })
      .addCase(fetchComments.rejected, (state) => {
        state.fetchingComments = false;
      });
  },
  selectors: {
    selectComments: (state) => state.comments,
    selectFetchingComments: (state) => state.fetchingComments,
    selectPostingComments: (state) => state.postingComment,
  },
});

export const commentsReducer = commentsSlice.reducer;
export const { selectComments, selectPostingComments, selectFetchingComments } = commentsSlice.selectors;
