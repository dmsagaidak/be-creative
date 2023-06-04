import React from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { selectUser } from '../users/usersSlice';
import { Navigate, useNavigate } from 'react-router-dom';
import { ProjectMutation } from '../../types';
import { createProject } from './projectsThunks';
import { Container } from '@mui/material';
import ProjectForm from './components/ProjectForm';
import { selectProjectCreateError, selectProjectCreating } from './projectsSlice';

const NewProject = () => {
  const dispatch = useAppDispatch();
  const loading = useAppSelector(selectProjectCreating);
  const error = useAppSelector(selectProjectCreateError);
  const user = useAppSelector(selectUser);
  const navigate = useNavigate();

  const onFormSubmit = async (project: ProjectMutation) => {
    try {
      await dispatch(createProject({ project })).unwrap();
      navigate(`/user/${user?._id}/projects`);
    } catch (e) {
      console.log(e);
    }
  };

  if (!user) {
    return <Navigate to={'/login'} />;
  }

  return (
    <Container>
      <ProjectForm onSubmit={onFormSubmit} loading={loading} error={error} />
    </Container>
  );
};

export default NewProject;
