import React from 'react';
import { Container, Typography } from '@mui/material';

const Footer = () => {
  return (
    <Container sx={{mt: 2}}>
      <Typography component='p'>BeCreative</Typography>
      <Typography component='p'> © All rights reserved</Typography>
    </Container>
  );
};

export default Footer;