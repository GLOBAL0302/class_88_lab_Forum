import { useState } from 'react';
import { useAppDispatch } from '../../app/hooks.ts';
import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Menu, MenuItem } from '@mui/material';
import { IUser } from '../../types';
import { unsetUser } from '../../features/Users/usersSlice.ts';

interface Props {
  user: IUser;
}

const UserMenu: React.FC<Props> = ({ user }) => {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogOut = () => {
    dispatch(unsetUser());
  };

  return (
    <>
      <Button onClick={handleClick} color="inherit">
        <Typography mr={2} variant="body2" component="p" color="inherit">
          Welcome {user.username}
        </Typography>
      </Button>
      <Menu anchorEl={anchorEl} onClose={handleClose} keepMounted={true} open={Boolean(anchorEl)}>
        <MenuItem onClick={() => navigate('/addPost')}>Add New Post</MenuItem>
        <MenuItem onClick={handleLogOut}>LogOut</MenuItem>
      </Menu>
    </>
  );
};

export default UserMenu;
