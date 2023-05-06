import React, { useEffect } from 'react';
import { Alert, Button, Container, Grid, Typography } from '@mui/material';
import teamImg from '../src/assets/images/team1.jpg';
import { useAppDispatch, useAppSelector } from './app/hooks';
import { selectUser } from './features/users/usersSlice';
import { useNavigate } from 'react-router-dom';
import { fetchProjectsByUser } from './features/projects/projectsThunks';
import { selectProjects } from './features/projects/projectsSlice';
import ProjectItem from './features/projects/components/ProjectItem';

const headingFS ={xs: '20px', sm: '30px', md: '40px', lg: '55px'}
const picWidth = {xs: '150px', sm: '300px', lg: '400px'}

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
        <Typography component='div' style={{width: '45vw'}}>
          <Typography component='p' style={{marginTop: 'auto', marginBottom: 'auto'}} fontSize={headingFS}>BeCreative team is here to improve your team work!</Typography>
        </Typography>
        <Typography component='img' src={teamImg} alt='Be creative' width={picWidth} style={{borderRadius: '30px'}}/>
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
        {projects.length ? projects.map((project) => (
          <ProjectItem key={project._id} project={project}/>
        )) : (<Alert severity="info">You haven't created any project</Alert>)}
      </Grid>

    </Container>
  );
};

export default Home;