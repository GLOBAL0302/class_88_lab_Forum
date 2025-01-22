import { configureStore } from '@reduxjs/toolkit';
import { postsReducer } from '../features/Posts/postsSlice.ts';
import { usersReducer } from '../features/Users/usersSlice.ts';

export const store = configureStore({
  reducer: {
    users: usersReducer,
    posts: postsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
