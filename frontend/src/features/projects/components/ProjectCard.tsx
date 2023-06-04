import React from 'react';
import { Card, CardContent, Typography } from '@mui/material';
import { profileItemCard } from '../../../styles';
import { Project } from '../../../types';
import { useNavigate } from 'react-router-dom';
import ProjectColorIndicator from '../../../components/UI/ProjectColorIndicator/ProjectColorIndicator';

interface Props {
  project: Project;
}

const ProjectCard: React.FC<Props> = ({ project }) => {
  const navigate = useNavigate();

  return (
    <Card style={profileItemCard} sx={{ position: 'relative' }} onClick={() => navigate(`/projects/${project._id}`)}>
      <ProjectColorIndicator project={project} />
      <CardContent>
        <Typography component="p" fontWeight={700}>
          {project.title}
        </Typography>
        <Typography
          component="p"
          fontWeight={700}
          color={project.status === 'Not started' ? '#2f4f4f' : project.status === 'Ongoing' ? '#32CD32' : '#6f98f7'}
        >
          {project.status}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default ProjectCard;
