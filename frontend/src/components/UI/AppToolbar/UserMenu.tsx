import React, { useState } from 'react';
import { User } from '../../../types';
import { Button, Menu, MenuItem, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../../app/hooks';
import { logout } from '../../../features/users/usersThunks';
import { apiUrl } from '../../../constants';

interface Props {
  user: User;
}

const UserMenu: React.FC<Props> = ({ user }) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    dispatch(logout());
  };

  let userImg;

   if (user.avatar && user.googleId){
    const avatarUrl = user.avatar.slice(8);
    userImg = apiUrl + '/' + avatarUrl;
  } else {
    userImg = apiUrl + '/' + user.avatar;
  }

  return (
    <>
      <Button onClick={handleClick} color="inherit">
        <Typography
          component="img"
          src={userImg}
          alt={user.displayName}
          style={{ width: '30px', height: '30px', borderRadius: '50%', marginRight: '15px' }}
        />{' '}
        Hello, {user.displayName}
      </Button>
      <Menu anchorEl={anchorEl} keepMounted open={Boolean(anchorEl)} onClose={handleClose}>
        <MenuItem onClick={() => navigate('/profile/' + user._id)}>My Profile</MenuItem>
        <MenuItem onClick={handleLogout}>Logout</MenuItem>
      </Menu>
    </>
  );
};

export default UserMenu;
