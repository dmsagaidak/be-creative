import React from 'react';
import { AppBar, Grid, styled, Toolbar, Typography } from '@mui/material';
import { Link as NavLink } from 'react-router-dom';
import { useAppSelector } from '../../../app/hooks';
import {
  selectLoginLoading,
  selectLogoutLoading,
  selectRegisterLoading,
  selectUser,
} from '../../../features/users/usersSlice';
import UserMenu from './UserMenu';
import AnonymousMenu from './AnonymousMenu';
import CircularProgressElement from '../CircularProgressElement/CircularProgressElement';

const Link = styled(NavLink)({
  color: 'inherit',
  textDecoration: 'none',
  '&:hover': {
    color: 'inherit',
  },
});

const AppToolbar = () => {
  const user = useAppSelector(selectUser);
  const loginLoading = useAppSelector(selectLoginLoading);
  const registerLoading = useAppSelector(selectRegisterLoading);
  const logoutLoading = useAppSelector(selectLogoutLoading);

  return (
    <AppBar position="sticky" sx={{ mb: 2, background: '#2F4F4F' }}>
      <Toolbar>
        <Grid container justifyContent="space-between" alignItems="center">
          <Typography variant="h6" component="div">
            <Link to="/">BeCreative</Link>
          </Typography>
          <Grid item>
            {loginLoading || registerLoading || logoutLoading ? (
              <CircularProgressElement />
            ) : user ? (
              <UserMenu user={user} />
            ) : (
              <AnonymousMenu />
            )}
          </Grid>
        </Grid>
      </Toolbar>
    </AppBar>
  );
};

export default AppToolbar;
