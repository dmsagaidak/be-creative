import React from 'react';
import { Task } from '../../../types';
import { Card, CardContent, CardHeader, Typography } from '@mui/material';

interface Props {
  task: Task
}

const TaskItem: React.FC<Props> = ({task}) => {
  return (
        <Card sx={{mt: 1, mb: 2}}>
          <CardHeader title={task.title}/>
          <CardContent>
            <Typography component='p'>{task.description}</Typography>
            <Typography component='p'>{task.isAssigned ?
              (<Typography component='span'>Assigned to {task.user}</Typography>) :
              (<Typography component='span'>Unassigned</Typography>)
            }</Typography>
          </CardContent>
        </Card>
  );
};

export default TaskItem;