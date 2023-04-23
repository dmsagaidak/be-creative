import React from 'react';
import { Task } from '../../../types';
import { Button, Card, CardContent, CardHeader, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

interface Props {
  task: Task
}

const TaskItem: React.FC<Props> = ({task}) => {
  const navigate = useNavigate();
  return (
        <Card sx={{mt: 1, mb: 2}}>
          <CardHeader title={task.title}/>
          <CardContent>
            <Typography component='p'>{task.description}</Typography>
            <Typography component='p'>{task.isAssigned ?
              (<Typography component='span'>Assigned to {task.user.displayName}</Typography>) :
              (<Typography component='span'>Unassigned</Typography>)
            }</Typography>
            <Button onClick={() => navigate(`/tasks/${task._id}`)}>See details</Button>
          </CardContent>
        </Card>
  );
};

export default TaskItem;