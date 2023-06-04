import React from 'react';
import { Card, CardContent, CardHeader, IconButton, Typography } from '@mui/material';
import { Project } from '../../../types';
import { pageSubheading, itemStyle } from '../../../styles';
import { useNavigate } from 'react-router-dom';
import { ArrowRight } from '@mui/icons-material';
import theme from '../../../theme';
import ProjectColorIndicator from '../../../components/UI/ProjectColorIndicator/ProjectColorIndicator';

interface Props {
  project: Project;
}

const ProjectItem: React.FC<Props> = ({ project }) => {
  const navigate = useNavigate();

  const styleColor =
    project.status === 'Not started'
      ? theme.palette.primary.main
      : project.status === 'Ongoing'
      ? '#32CD32'
      : '#6f98f7';

  return (
    <Card style={itemStyle} sx={{ position: 'relative' }} onClick={() => navigate(`/projects/${project._id}`)}>
      <CardHeader
        sx={{ pl: 6 }}
        title={project.title}
        action={
          <IconButton onClick={() => navigate(`/projects/${project._id}`)}>
            <ArrowRight />
          </IconButton>
        }
      />
      <ProjectColorIndicator project={project} />
      <CardContent>
        <Typography component="p" style={pageSubheading}>
          What&apos;s to be done:
        </Typography>
        <Typography component="p">{project.description}</Typography>
        <Typography component="p" fontWeight={700} style={{ color: styleColor }}>
          {project.status}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default ProjectItem;
