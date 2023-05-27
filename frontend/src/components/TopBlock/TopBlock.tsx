import React from 'react';
import { Grid, Typography } from '@mui/material';
import teamImg from '../../assets/images/team1.jpg';
import { headingFS } from '../../styles';
const picWidth = {xs: '300px', sm: '350px', md: '350px', lg: '400px'}

const TopBlock = () => {
  return (
    <Grid
      container
      direction={{xs: 'column', sm: 'row'}}
      style={{paddingTop: '25px', justifyContent: 'space-between'}}>
      <Grid item xs style={{width: '45vw'}}>
        <Typography component='p' color="primary" style={{marginTop: 'auto', marginBottom: 'auto'}} fontSize={headingFS}>BeCreative team is here to improve your team work!</Typography>
      </Grid>
      <Grid item xs style={{width: '55vw'}}>
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