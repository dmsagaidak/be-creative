import React from 'react';
import { Card, CardContent, CardHeader, IconButton, Typography } from '@mui/material';
import { Project } from '../../../types';
import { boxShadow } from '../../../styles';
import { useNavigate } from 'react-router-dom';
import { ArrowRight } from '@mui/icons-material';

interface Props {
  project: Project
}

const styles = {
  boxShadow,
  marginTop: '7px',
  width: '70vw',
}

const ProjectItem: React.FC<Props> = ({project}) => {
  const navigate = useNavigate();

  return (
    <Card style={styles}>
      <CardHeader
        title={project.title}
        action={<IconButton onClick={() => navigate(`/projects/${project._id}`)}><ArrowRight/></IconButton>}/>
      <CardContent>
        <Typography component='p'>What's to be done:</Typography>
        <Typography component='p'>{project.description}</Typography>
      </CardContent>
    </Card>
  );
};

export default ProjectItem;