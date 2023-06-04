import React from 'react';
import { Grid, Typography } from '@mui/material';
import theme from '../../theme';

const Footer = () => {
  return (
    <>
      <Grid
        container
        direction="column"
        sx={{ mt: 2, background: theme.palette.primary.main, color: '#fff', pt: 2, pb: 2 }}
      >
        <Grid item xs sx={{ ml: 3 }}>
          <Typography component="p">BeCreative</Typography>
          <Typography component="p"> © All rights reserved</Typography>
        </Grid>
      </Grid>
    </>
  );
};

export default Footer;
