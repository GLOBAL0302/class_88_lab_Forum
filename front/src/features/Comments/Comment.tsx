import { IComments } from '../../types';
import { Grid2 } from '@mui/material';
import Typography from '@mui/material/Typography';

interface Props {
  comment: IComments;
}

const Comment: React.FC<Props> = ({ comment }) => {
  return (
    <Grid2>
      <Grid2
        alignItems="center"
        sx={{
          marginBottom: 2,
          padding: 2,
          border: '2px solid black',
        }}
      >
        <Typography variant="h5" component="div">
          <strong>Author:</strong> {comment.post.user.username}
        </Typography>
        <Typography variant="body1" component="p">
          <strong>message:</strong> {comment.description}
        </Typography>
      </Grid2>
    </Grid2>
  );
};

export default Comment;
