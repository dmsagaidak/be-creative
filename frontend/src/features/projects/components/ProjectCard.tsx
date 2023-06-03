import React from 'react';
import { Card, Typography } from '@mui/material';
import { profileItemCard } from '../../../styles';
import { Project } from '../../../types';
import { useNavigate } from 'react-router-dom';

interface Props {
  project: Project;
}

const ProjectCard: React.FC<Props> = ({project}) => {
  const navigate = useNavigate();
  return (
    <Card
      style={profileItemCard}
      onClick={() => navigate(`/projects/${project._id}`)}
    >
      <Typography component="p" fontWeight={700}>{project.title}</Typography>
      <Typography>{project.status}</Typography>
    </Card>
  );
};

export default ProjectCard;