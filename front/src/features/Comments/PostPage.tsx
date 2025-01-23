import {useParams} from 'react-router-dom';
import Box from '@mui/material/Box';
import {useCallback, useEffect} from 'react';
import {useAppDispatch, useAppSelector} from '../../app/hooks.ts';
import {fetchComments} from './commentsThunk.ts';
import {selectComments} from './commentsSlice.ts';
import Comment from './Comment.tsx';
import {Grid2} from '@mui/material';
import AddComment from '../../components/AddComment/AddComment.tsx';

const PostPage = () => {
  const {id} = useParams();
  const dispatch = useAppDispatch();
  const comments = useAppSelector(selectComments);

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
        <Grid2
          component="div"
          marginBottom={2}
          overflow={"scroll"}
          height={500}
        >
          {comments.map((comment) => (
            <Comment key={comment._id} comment={comment}/>
          ))}
        </Grid2>
        {id && <AddComment postId={id}/>}
      </Box>
    )
  );
};

export default PostPage;
