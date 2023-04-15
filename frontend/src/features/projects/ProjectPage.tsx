import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { selectOneProject } from './projectsSlice';
import { fetchOneProject } from './projectsThunks';

const ProjectPage = () => {
  const { id } = useParams() as { id: string };
  const dispatch = useAppDispatch();
  const project = useAppSelector(selectOneProject);

  useEffect(() => {
    void dispatch(fetchOneProject(id));
  }, [dispatch, id])

  console.log(project)
  return (
    <div>

    </div>
  );
};

export default ProjectPage;