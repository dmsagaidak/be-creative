import React from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { selectUser } from '../users/usersSlice';
import { Navigate, useNavigate } from 'react-router-dom';
import { ParticipantMutation, ProjectMutation } from '../../types';
import { createProject } from './projectsThunks';
import { Typography } from '@mui/material';
import ProjectForm from './components/ProjectForm';

const NewProject = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectUser);
  const navigate = useNavigate();

  const onFormSubmit = async (project: ProjectMutation, participants: ParticipantMutation[]) => {
    try{
      await dispatch(createProject({project, participants})).unwrap();
      navigate('/');
    }catch (e) {
      console.log(e);
    }
  };

  if(!user) {
    return <Navigate to={'/login'} />;
  }

  return (
    <>
      <Typography variant="h4" sx={{ mb: 2 }}>Create new project</Typography>
      <ProjectForm onSubmit={onFormSubmit}/>
    </>
  );
};

export default NewProject;