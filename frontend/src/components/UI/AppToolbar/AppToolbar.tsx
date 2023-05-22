import React from 'react';
import { AppBar, Button, Grid, styled, Toolbar, Typography } from '@mui/material';
import { Link as NavLink, useNavigate } from 'react-router-dom';
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
  const navigate = useNavigate();

  return (
    <AppBar position="sticky" sx={{ mb: 2, background: '#2F4F4F' }}>
      <Toolbar>
        <Grid container justifyContent="space-between" alignItems="center">
          <Typography variant="h6" component="div">
            <Link to="/">BeCreative</Link>
          </Typography>
          <Grid
            item
            container
            alignItems="center"
            justifyContent="flex-end"
            xs={12}
            md={9}
          >
            {user ?
              (<><Button
                onClick={() => navigate('/calendar')} color="inherit"
              >
                Calendar
              </Button>
                <Button
                  onClick={() => navigate('/chat')} color="inherit"
                >
                  Chat
                </Button>
              </>) : (<Typography></Typography>)}

          </Grid>
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
