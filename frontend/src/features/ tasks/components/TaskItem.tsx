import React from 'react';
import { Task } from '../../../types';
import { Button, Card, CardContent, CardHeader, IconButton, Typography, useMediaQuery } from '@mui/material';
import { ArrowRight } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useAppSelector } from '../../../app/hooks';
import { selectUser } from '../../users/usersSlice';

const cardWidth = {
  xs: '70vw',
  sm: '50vw',
  md: '45vw',
};

interface Props {
  task: Task;
  onDelete: (taskId: string) => void;
}

const TaskItem: React.FC<Props> = ({task, onDelete}) => {
  const navigate = useNavigate();
  const user = useAppSelector(selectUser);

  const isXs = useMediaQuery('(max-width:599px)');
  const isSm = useMediaQuery('(min-width:600px) and (max-width:899px)');

  return (
        <Card
          sx={{mt: 1, mb: 2, mr: 1}}
          style={{width: isXs ? cardWidth.xs : isSm ? cardWidth.sm : cardWidth.md}}
        >
          <CardHeader
            title={task.title}
            action={
            <IconButton
              onClick={() => navigate(`/tasks/${task._id}`)}
            >
              <ArrowRight/>
            </IconButton>}
          />
          <CardContent>
            <Typography
              component='div'
            >
              {task.description}
            </Typography>
            <Typography component='p'>{task.user ?
              (<Typography component='span'>Assigned to <Typography
                component="a"
                href={'/profile/' + task.user._id}
                style={{textDecoration: 'none'}}
              >
                {task.user.displayName}
              </Typography>
              </Typography>) :
              (<Typography component='span'>Unassigned</Typography>)
            }</Typography>
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