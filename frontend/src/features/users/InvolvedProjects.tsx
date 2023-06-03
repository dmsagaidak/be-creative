import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { selectUserById } from './usersSlice';
import { fetchProjectByParticipant } from '../projects/projectsThunks';
import { selectProjectsByParticipant, selectProjectsFetching } from '../projects/projectsSlice';
import ProjectItem from '../projects/components/ProjectItem';
import { Alert, Container, Grid, Typography } from '@mui/material';
import CircularProgressElement from '../../components/UI/CircularProgressElement/CircularProgressElement';

const InvolvedProjects = () => {
  const { id } = useParams() as { id: string };
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectUserById);
  const projects = useAppSelector(selectProjectsByParticipant);
  const projectsFetching = useAppSelector(selectProjectsFetching);

  useEffect(() => {
    void dispatch(fetchProjectByParticipant(id));
  }, [dispatch, id]);

  const currentProjects = (projects.length ?
    projects.map((project) => (
      <ProjectItem key={project._id} project={project}/>
    )) :
      ((<Alert severity="info">You are not involved in any project</Alert>))
  )

  return (
    <Container>
      <Grid container direction='column' style={{paddingTop: '35px'}}>
        <Typography
          variant='h4'
          style={{paddingBottom: '20px'}}
        >
          Projects {user?.displayName} participates in
        </Typography>
        {projectsFetching ? <CircularProgressElement/> : currentProjects}
      </Grid>
    </Container>
  );
};

export default InvolvedProjects;