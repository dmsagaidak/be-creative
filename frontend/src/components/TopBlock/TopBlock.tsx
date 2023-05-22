import React from 'react';
import { Grid, Typography } from '@mui/material';
import teamImg from '../../assets/images/team1.jpg';

const headingFS ={xs: '20px', sm: '30px', md: '40px', lg: '55px'}
const picWidth = {xs: '150px', sm: '300px', lg: '400px'}

const TopBlock = () => {
  return (
    <Grid container direction='row' style={{paddingTop: '25px'}}>
      <Typography component='div' style={{width: '45vw'}}>
        <Typography component='p' style={{marginTop: 'auto', marginBottom: 'auto'}} fontSize={headingFS}>BeCreative team is here to improve your team work!</Typography>
      </Typography>
      <Typography component='img' src={teamImg} alt='Be creative' width={picWidth} style={{borderRadius: '30px'}}/>
    </Grid>
  );
};

export default TopBlock;