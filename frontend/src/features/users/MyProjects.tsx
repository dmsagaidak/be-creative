import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { selectUserById } from './usersSlice';
import { selectProjects, selectProjectsFetching } from '../projects/projectsSlice';
import { fetchProjectsByUser } from '../projects/projectsThunks';
import { Alert, Container, Grid, IconButton, Typography } from '@mui/material';
import ProjectItem from '../projects/components/ProjectItem';
import CircularProgressElement from '../../components/UI/CircularProgressElement/CircularProgressElement';
import { useNavigate, useParams } from 'react-router-dom';
import { findUserById } from './usersThunks';
import AddIcon from '@mui/icons-material/Add';

const MyProjects = () => {
  const { id } = useParams() as { id: string };
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const user = useAppSelector(selectUserById);
  const projects = useAppSelector(selectProjects);
  const projectsFetching = useAppSelector(selectProjectsFetching);

  useEffect(() => {
    void dispatch(fetchProjectsByUser(id));
    void dispatch(findUserById(id));
  }, [dispatch, id]);

  const currentProjects = projects.length ? (
    projects.map((project) => <ProjectItem key={project._id} project={project} />)
  ) : (
    <Alert severity="info">You haven&apos;t created any project</Alert>
  );

  return (
    <Container>
      <Grid container direction="column" style={{ paddingTop: '35px' }}>
        <Typography variant="h4" style={{ paddingBottom: '20px' }}>
          {user?.displayName}&apos;s projects
          <IconButton onClick={() => navigate('/projects/new')}>
            <AddIcon />
          </IconButton>
        </Typography>
        {projectsFetching ? <CircularProgressElement /> : currentProjects}
      </Grid>
    </Container>
  );
};

export default MyProjects;
