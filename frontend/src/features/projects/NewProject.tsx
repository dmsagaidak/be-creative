import React from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { selectUser } from '../users/usersSlice';
import { Navigate, useNavigate } from 'react-router-dom';
import { ProjectMutation } from '../../types';
import { createProject } from './projectsThunks';
import { Typography } from '@mui/material';
import ProjectForm from './components/ProjectForm';
import { selectProjectCreateError, selectProjectCreating } from './projectsSlice';

const NewProject = () => {
  const dispatch = useAppDispatch();
  const loading = useAppSelector(selectProjectCreating);
  const error = useAppSelector(selectProjectCreateError);
  const user = useAppSelector(selectUser);
  const navigate = useNavigate();


  const onFormSubmit = async (project: ProjectMutation) => {
    try{
      await dispatch(createProject({project})).unwrap();
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
      <ProjectForm onSubmit={onFormSubmit} loading={loading} error={error}/>
    </>
  );
};

export default NewProject;