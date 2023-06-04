import React from 'react';
import { Project } from '../../../types';
import { Typography } from '@mui/material';

interface Props {
  project: Project;
}

const ProjectColorIndicator: React.FC<Props> = ({ project }) => {
  return (
    <>
      <Typography
        component="div"
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '15px',
          height: '15px',
          border: '20px solid transparent',
          borderLeft:
            project.status === 'Not started'
              ? '20px solid #2f4f4f'
              : project.status === 'Ongoing'
              ? '20px solid #32CD32'
              : '20px solid #6f98f7',
          borderTop:
            project.status === 'Not started'
              ? '20px solid #2f4f4f'
              : project.status === 'Ongoing'
              ? '20px solid #32CD32'
              : '20px solid #6f98f7',
        }}
      />
    </>
  );
};

export default ProjectColorIndicator;
