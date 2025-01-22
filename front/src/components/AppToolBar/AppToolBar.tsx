import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import AnnouncementIcon from '@mui/icons-material/Announcement';
import { Grid2 } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import AnonymousMenu from './AnonymousMenu.tsx';
import { useAppSelector } from '../../app/hooks.ts';
import { selectUser } from '../../features/Users/usersSlice.ts';
import UserMenu from './UserMenu.tsx';

const AppToolBar = () => {
  const navigate = useNavigate();
  const user = useAppSelector(selectUser);

  return (
    <Box sx={{ flexGrow: 1, marginBottom: 10 }}>
      <AppBar position="absolute">
        <Toolbar>
          <Grid2 container width={'100%'} alignItems="center">
            <Grid2 onClick={() => navigate('/')} container alignItems="center">
              <Typography variant="h5" component="h5" sx={{ flexGrow: 1 }}>
                FORUM
              </Typography>
              <IconButton size="large" edge="start" color="inherit" aria-label="menu">
                <AnnouncementIcon />
              </IconButton>
            </Grid2>
            <Grid2 marginLeft="auto">{user ? <UserMenu user={user} /> : <AnonymousMenu />}</Grid2>
          </Grid2>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default AppToolBar;
