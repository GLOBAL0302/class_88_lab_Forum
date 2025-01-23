import { useState } from 'react';
import { Grid2, TextField } from '@mui/material';
import Button from '@mui/material/Button';
import { useAppDispatch } from '../../app/hooks.ts';
import { addCommentsThunk, fetchComments } from '../../features/Comments/commentsThunk.ts';

interface Props {
  postId: string;
}

const AddComment: React.FC<Props> = ({ postId }) => {
  const dispatch = useAppDispatch();
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

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(addCommentsThunk(commentForm));
    dispatch(fetchComments(postId));
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
        <Button variant="contained" color="primary" type="submit">
          Add Comment
        </Button>
      </Grid2>
    </Grid2>
  );
};

export default AddComment;
