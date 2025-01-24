import { useParams } from 'react-router-dom';
import Box from '@mui/material/Box';
import { useCallback, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks.ts';
import { fetchComments } from './commentsThunk.ts';
import { selectComments, selectFetchingComments } from './commentsSlice.ts';
import Comment from './Comment.tsx';
import { CircularProgress, Grid2 } from '@mui/material';
import AddComment from '../../components/AddComment/AddComment.tsx';
import { selectUser } from '../Users/usersSlice.ts';

const PostPage = () => {
  const { id } = useParams();
  const user = useAppSelector(selectUser);
  const dispatch = useAppDispatch();
  const comments = useAppSelector(selectComments);
  const fetchingComments = useAppSelector(selectFetchingComments);

  const fetchAllComments = useCallback(() => {
    if (id) {
      dispatch(fetchComments(id));
    }
  }, []);

  useEffect(() => {
    void fetchAllComments();
  }, []);

  return (
    comments && (
      <Box component="div">
        <Grid2 component="div" marginBottom={2} overflow={'scroll'} height={500}>
          {fetchingComments ? (
            <CircularProgress />
          ) : (
            <>
              {comments.map((comment) => (
                <Comment key={comment._id} comment={comment} />
              ))}
            </>
          )}
        </Grid2>
        {id && user && <AddComment postId={id} />}
      </Box>
    )
  );
};

export default PostPage;
