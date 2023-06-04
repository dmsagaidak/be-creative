import React from 'react';
import { Task } from '../../../types';
import { Typography } from '@mui/material';

interface Props {
  task: Task;
}

const TaskColorIndicator: React.FC<Props> = ({ task }) => {
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
            task.status === 'To do'
              ? '20px solid #2f4f4f'
              : task.status === 'In progress'
              ? '20px solid #32CD32'
              : task.status === 'On hold'
              ? '20px solid #FFA500'
              : '20px solid #6f98f7',
          borderTop:
            task.status === 'To do'
              ? '20px solid #2f4f4f'
              : task.status === 'In progress'
              ? '20px solid #32CD32'
              : task.status === 'On hold'
              ? '20px solid #FFA500'
              : '20px solid #6f98f7',
        }}
      />
    </>
  );
};

export default TaskColorIndicator;
