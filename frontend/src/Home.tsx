import React, { useEffect } from 'react';
import { Button, Container, Grid, Typography } from '@mui/material';
import teamImg from '../src/assets/images/team1.jpg';
import { useAppDispatch, useAppSelector } from './app/hooks';
import { selectUser } from './features/users/usersSlice';
import { useNavigate } from 'react-router-dom';
import { fetchProjectsByUser } from './features/projects/projectsThunks';
import { selectProjects } from './features/projects/projectsSlice';
import ProjectItem from './features/projects/components/ProjectItem';

const Home = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectUser);
  const projects = useAppSelector(selectProjects);
  const navigate = useNavigate();

  useEffect(() => {
    if(user){
      void dispatch(fetchProjectsByUser(user._id))
    }
  }, [dispatch, user]);

  return (
    <Container>
      <Grid container direction='row' style={{paddingTop: '25px'}}>
        <Typography component='div' style={{width: '45vw', position: 'relative'}}>
          <Typography variant='h3' style={{position: 'absolute', top: '10%', left: '10%'}}>BeCreative team is here to improve your team work!</Typography>
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
      <Grid container direction='column' style={{paddingTop: '35px'}}>
        <Typography variant='h4'>Your projects</Typography>
        {projects.map((project) => (
          <ProjectItem key={project._id} project={project}/>
        ))}
      </Grid>

    </Container>
  );
};

export default Home;