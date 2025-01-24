import { useState } from 'react';
import { CircularProgress, Grid2, TextField } from '@mui/material';
import Button from '@mui/material/Button';
import { useAppDispatch, useAppSelector } from '../../app/hooks.ts';
import { addCommentsThunk, fetchComments } from '../../features/Comments/commentsThunk.ts';
import { selectPostingComments } from '../../features/Comments/commentsSlice.ts';

interface Props {
  postId: string;
}

const AddComment: React.FC<Props> = ({ postId }) => {
  const dispatch = useAppDispatch();
  const postingComment = useAppSelector(selectPostingComments);

  const [commentForm, setCommentForm] = useState({
    postId: postId,
    description: '',
  });

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setCommentForm((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await dispatch(addCommentsThunk(commentForm));
    await dispatch(fetchComments(postId));
    console.log(commentForm);
  };

  return (
    <Grid2 container component="form" alignItems="center" justifyContent="space-between" onSubmit={onSubmit}>
      <Grid2 width={'80%'}>
        <TextField
          value={commentForm.description}
          label="Comment"
          onChange={onChange}
          variant="outlined"
          name={'description'}
          id={'description'}
          fullWidth
        />
      </Grid2>
      <Grid2>
        <Button disabled={postingComment} variant="contained" color="primary" type="submit">
          Add Comment {postingComment && <CircularProgress />}
        </Button>
      </Grid2>
    </Grid2>
  );
};

export default AddComment;
