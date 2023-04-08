import React from 'react';
import { Button } from '@mui/material';
import { Link as NavLink } from 'react-router-dom';

const AnonymousMenu = () => {
  return (
    <>
      <Button component={NavLink} to="/register" color="inherit">
        Register
      </Button>
      <Button component={NavLink} to="/login" color="inherit">
        Login
      </Button>
    </>
  );
};

export default AnonymousMenu;
