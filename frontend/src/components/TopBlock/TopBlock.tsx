import React from 'react';
import { Grid, Typography } from '@mui/material';
import teamImg from '../../assets/images/team1.jpg';
import { headingFS } from '../../styles';
const picWidth = {xs: '300px', md: '350px', lg: '400px'}

const TopBlock = () => {
  return (
    <Grid
      container
      direction={{xs: 'column', sm: 'row'}}
      style={{paddingTop: '25px', justifyContent: 'space-between'}}>
      <Grid item xs={12} sm={5} md={6}>
        <Typography
          component='p'
          color="primary"
          textAlign={{xs: 'center', sm: 'left'}}
          style={{marginTop: 'auto', marginBottom: 'auto'}}
          fontSize={headingFS}
        >
          BeCreative team is here to improve your team work!
        </Typography>
      </Grid>
      <Grid item xs={12} sm={7} md={6} marginTop={{xs: '25px', sm: 0}} textAlign="center">
        <Typography
          component='img'
          src={teamImg}
          alt='Be creative'
          width={picWidth}
          style={{borderRadius: '30px'}}
        />
      </Grid>
    </Grid>
  );
};

export default TopBlock;