import { useAppDispatch, useAppSelector } from '../../app/hooks.ts';
import { useCallback, useEffect } from 'react';
import { selectFetchingPosts, selectPosts } from './postsSlice.ts';
import { fetchPostsThunk } from './PostsThunk.ts';
import OnePost from './OnePost.tsx';
import { CircularProgress, Grid2 } from '@mui/material';

const Posts = () => {
  const dispatch = useAppDispatch();
  const posts = useAppSelector(selectPosts);
  const loadingPosts = useAppSelector(selectFetchingPosts);

  const fetchAllPosts = useCallback(async () => {
    await dispatch(fetchPostsThunk());
  }, []);

  useEffect(() => {
    void fetchAllPosts();
  }, []);

  return (
    <Grid2 container direction="column" spacing={2}>
      {loadingPosts ? (
        <CircularProgress />
      ) : (
        <>{posts && posts.map((post) => <OnePost key={post._id} post={post} />)}</>
      )}
    </Grid2>
  );
};

export default Posts;
