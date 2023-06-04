import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { selectOneProject, selectProjectUpdateError, selectProjectUpdating } from './projectsSlice';
import { selectUser } from '../users/usersSlice';
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import { fetchOneProject, updateProject } from './projectsThunks';
import { ProjectMutation } from '../../types';
import { Container } from '@mui/material';
import ProjectForm from './components/ProjectForm';

const EditProject = () => {
  const { id } = useParams() as { id: string };
  const dispatch = useAppDispatch();
  const project = useAppSelector(selectOneProject);
  const user = useAppSelector(selectUser);
  const loading = useAppSelector(selectProjectUpdating);
  const error = useAppSelector(selectProjectUpdateError);
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      void dispatch(fetchOneProject(id));
    }
  }, [dispatch, id]);

  const onSubmit = async (project: ProjectMutation) => {
    try {
      await dispatch(updateProject({ id, project })).unwrap();
      navigate('/projects/' + id);
    } catch (e) {
      console.log(e);
    }
  };

  const existingProject = project && {
    title: project.title,
    description: project.description,
    start: project.start,
    deadline: project.deadline,
    image: null,
    participants: project.participants.map((item) => ({ role: item.role, user: item.user._id })),
  };

  if (!user) {
    return <Navigate to={'/login'} />;
  }

  return (
    <Container>
      {existingProject && (
        <ProjectForm onSubmit={onSubmit} loading={loading} error={error} existingProject={existingProject} isEdit />
      )}
    </Container>
  );
};

export default EditProject;
