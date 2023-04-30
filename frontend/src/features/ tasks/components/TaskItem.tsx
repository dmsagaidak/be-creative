import React from 'react';
import { Task } from '../../../types';
import { Button, Card, CardContent, CardHeader, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useAppSelector } from '../../../app/hooks';
import { selectUser } from '../../users/usersSlice';

interface Props {
  task: Task;
  onDelete: (taskId: string) => void;
}

const TaskItem: React.FC<Props> = ({task, onDelete}) => {
  const navigate = useNavigate();
  const user = useAppSelector(selectUser);
  return (
        <Card sx={{mt: 1, mb: 2}}>
          <CardHeader title={task.title}/>
          <CardContent>
            <Typography component='p'>{task.description}</Typography>
            <Typography component='p'>{task.user ?
              (<Typography component='span'>Assigned to {task.user.displayName}</Typography>) :
              (<Typography component='span'>Unassigned</Typography>)
            }</Typography>
            <Button onClick={() => navigate(`/tasks/${task._id}`)}>See details</Button>
            {user?._id === task.createdBy._id ?
              (<Typography component='div'>
                <Button onClick={() => onDelete(task._id)} color='error' variant='contained'>Remove</Button>
              </Typography>) :
              (<Typography></Typography>)
            }
          </CardContent>
        </Card>
  );
};

export default TaskItem;