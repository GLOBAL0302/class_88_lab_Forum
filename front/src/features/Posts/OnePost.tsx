import { IPost } from '../../types';
import { CardMedia, Grid2 } from '@mui/material';
import Typography from '@mui/material/Typography';
import dayjs from 'dayjs';
import noPic from '../../assets/chat.png';
import { apiUrl } from '../../GlobalConstant.ts';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';

interface Props {
  post: IPost;
}

const OnePost: React.FC<Props> = ({ post }) => {
  const navigate = useNavigate();

  let artistsPic = noPic;

  if (post.image) {
    artistsPic = apiUrl + '/' + post.image;
  }

  const goToOnePost = () => {
    navigate(`/postPage/${post._id}`);
  };

  return (
    <Grid2
      spacing={2}
      sx={{
        padding: 2,
        border: '2px solid black',
      }}
      container
    >
      <Grid2>
        <CardMedia component="img" image={artistsPic} style={{ width: '100px', height: '100px' }} title={post.title} />
      </Grid2>
      <Grid2>
        <Typography variant="body2" component="p">
          {dayjs(post.create_at).format('DD/MM/YYYY HH:mm:ss')} by {post.user.username}
        </Typography>
        <Button onClick={goToOnePost} variant="contained" color="primary">
          {post.title}
        </Button>
      </Grid2>
    </Grid2>
  );
};

export default OnePost;
