import React from 'react';
import { Card, CardContent, Typography } from '@mui/material';
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
      sx={{position: 'relative'}}
      onClick={() => navigate(`/projects/${project._id}`)}
    >
      <Typography
        component="div"
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '15px',
          height: '15px',
          border: '20px solid transparent',
          borderLeft: project.status === 'Not started' ? '20px solid #2f4f4f' : project.status === 'Ongoing' ? '20px solid #32CD32' : '20px solid #6f98f7',
          borderTop: project.status === 'Not started' ? '20px solid #2f4f4f' : project.status === 'Ongoing' ? '20px solid #32CD32' : '20px solid #6f98f7',
        }}
      ></Typography>
      <CardContent>
        <Typography component="p" fontWeight={700}>{project.title}</Typography>
        <Typography
          component="p"
          fontWeight={700}
          color={project.status === 'Not started' ? '#2f4f4f' : project.status === 'Ongoing' ? '#32CD32' : '#6f98f7'}
        >{project.status}</Typography>
      </CardContent>
    </Card>
  );
};

export default ProjectCard;