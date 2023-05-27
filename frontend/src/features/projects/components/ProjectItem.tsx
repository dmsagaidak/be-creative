import React from 'react';
import { Card, CardContent, CardHeader, IconButton, Typography } from '@mui/material';
import { Project } from '../../../types';
import { pageSubheading, projectItemStyle } from '../../../styles';
import { useNavigate } from 'react-router-dom';
import { ArrowRight } from '@mui/icons-material';
import theme from '../../../theme'

interface Props {
  project: Project
}

const ProjectItem: React.FC<Props> = ({project}) => {
  const navigate = useNavigate();

  const styleColor = project.status === 'Not started' ?
    theme.palette.info.main : project.status === 'Ongoing' ?
      theme.palette.success.main : 'red';

  return (
    <Card
      style={projectItemStyle}
      onClick={() => navigate(`/projects/${project._id}`)}
    >
      <CardHeader
        title={project.title}
        action={
        <IconButton
          onClick={() => navigate(`/projects/${project._id}`)}
        >
          <ArrowRight/>
        </IconButton>}
      />
      <CardContent>
        <Typography component='p' style={pageSubheading}>What's to be done:</Typography>
        <Typography component='p'>{project.description}</Typography>
        <Typography component='p' style={{color: styleColor}}>{project.status}</Typography>
      </CardContent>
    </Card>
  );
};

export default ProjectItem;