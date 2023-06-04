import React from 'react';
import { Task } from '../../../types';
import { Card, CardContent, CardHeader, IconButton, Typography } from '@mui/material';
import { ArrowRight } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { boxShadow, itemStyle } from '../../../styles';
import TaskColorIndicator from '../../../components/UI/TaskColorIndicator/TaskColorIndicator';

interface Props {
  task: Task;
}

const TaskItem: React.FC<Props> = ({ task }) => {
  const navigate = useNavigate();

  return (
    <Card
      sx={{ mt: 1, mb: 2, mr: 1, boxShadow, position: 'relative' }}
      style={itemStyle}
      onClick={() => navigate(`/tasks/${task._id}`)}
    >
      <CardHeader
        title={task.title}
        sx={{ pl: 6 }}
        action={
          <IconButton onClick={() => navigate(`/tasks/${task._id}`)}>
            <ArrowRight />
          </IconButton>
        }
      />
      <TaskColorIndicator task={task} />
      <CardContent>
        <Typography component="div">{task.description}</Typography>
        <Typography component="div" sx={{ mt: 2, mb: 2 }}>
          {task.user ? (
            <Typography component="span">
              Assigned to{' '}
              <Typography component="a" href={'/profile/' + task.user._id} style={{ textDecoration: 'none' }}>
                {task.user.displayName}
              </Typography>
            </Typography>
          ) : (
            <Typography component="span">Unassigned</Typography>
          )}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default TaskItem;
