import Button from '@mui/material/Button';
import { NavLink } from 'react-router-dom';
import { Grid2 } from '@mui/material';

const AnonymousMenu = () => {
  return (
    <Grid2 container spacing={2}>
      <Button component={NavLink} to="/register" variant="contained" color="success">
        Sign Up
      </Button>
      <Button component={NavLink} to="/login" variant="contained" color="warning">
        Sign IN
      </Button>
    </Grid2>
  );
};

export default AnonymousMenu;
