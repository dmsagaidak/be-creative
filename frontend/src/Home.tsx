import React from 'react';
import { Button, Container, Grid, Typography } from '@mui/material';
import teamImg from '../src/assets/images/team1.jpg';
import { useAppSelector } from './app/hooks';
import { selectUser } from './features/users/usersSlice';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const user = useAppSelector(selectUser);
  const navigate = useNavigate();

  return (
    <Container>
      <Grid container direction='row' style={{paddingTop: '25px'}}>
        <Typography component='div' style={{width: '45vw', position: 'relative'}}>
          <Typography component='p' style={{position: 'absolute', top: '10%', left: '10%', fontSize: '45px'}}>Be creative is here to improve your team work!</Typography>
        </Typography>
        <Typography component='img' src={teamImg} alt='Be creative' style={{width: '400px', borderRadius: '30px'}}/>
      </Grid>
      <Grid container direction='column' style={{marginTop: '30px'}}>
        <Button
          variant='contained'
          color='primary'
          style={{width: '30vw'}}
          onClick={() => navigate(user ? ('/projects/new') : ('/login'))}
        >Create your project now!</Button>
      </Grid>

    </Container>
  );
};

export default Home;