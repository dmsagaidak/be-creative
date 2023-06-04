import React from 'react';
import { useAppSelector } from '../../app/hooks';
import { selectUser } from '../../features/users/usersSlice';
import { useNavigate } from 'react-router-dom';
import { Button, Grid, Typography } from '@mui/material';
import projectsBg from '../../assets/images/projectsBg.jpg';
import { headingFS } from '../../styles';

const ProjectsBlock = () => {
  const user = useAppSelector(selectUser);
  const navigate = useNavigate();
  return (
    <Grid container spacing={2} direction="column" style={{ background: `url(${projectsBg})` }}>
      <Grid item xs textAlign="center" sx={{ mt: 3 }}>
        <Typography component="p" variant="h3" fontSize={headingFS} style={{ color: '#fff' }}>
          Boost your efficiency!
        </Typography>
        <Typography
          component="p"
          fontSize={{ xs: '18px', sm: '20px', md: '25px' }}
          style={{ color: '#fff', paddingTop: '30px', paddingLeft: '15px', paddingRight: '15px' }}
        >
          Create projects, invite your colleagues, set roles, start and deadline dates
        </Typography>
      </Grid>
      <Grid item xs textAlign="center" sx={{ mt: 3, mb: 3 }}>
        <Button
          style={{ color: '#fff', border: '1px solid #fff' }}
          onClick={() => navigate(user ? '/projects/new' : '/login')}
        >
          <Typography component="span">Create your project now!</Typography>
        </Button>
      </Grid>
    </Grid>
  );
};

export default ProjectsBlock;
