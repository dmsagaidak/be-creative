import React from 'react';
import { useAppSelector } from '../../app/hooks';
import { selectUser } from '../../features/users/usersSlice';
import { useNavigate } from 'react-router-dom';
import { Button, Grid, Typography } from '@mui/material';
import projectsBg from '../../assets/images/projectsBg.jpg';

const ProjectsBlock = () => {
  const user = useAppSelector(selectUser);
  const navigate = useNavigate();
  return (
    <Grid container spacing={2} direction="column" style={{background: `url(${projectsBg})`}}>
      <Grid item xs textAlign="center" sx={{mt: 3}}>
        <Typography variant="h3" style={{color: '#fff'}}>Boost your efficiency!</Typography>
        <Typography component="p" style={{color: '#fff', fontSize: '25px', paddingTop: '30px'}}>Create projects, invite your colleagues, set roles, start and deadline dates</Typography>
      </Grid>
      <Grid item xs textAlign="center" sx={{mt: 3, mb: 3}}>
        <Button
          style={{width: '30vw', color: '#fff', border: '1px solid #fff'}}
          onClick={() => navigate(user ? ('/projects/new') : ('/login'))}
        >
          Create your project now!
        </Button>
      </Grid>
    </Grid>
  );
};

export default ProjectsBlock;