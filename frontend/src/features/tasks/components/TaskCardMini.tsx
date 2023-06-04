import React from 'react';
import { Card, CardContent, Typography } from '@mui/material';
import { profileItemCard } from '../../../styles';
import { useNavigate } from 'react-router-dom';
import { Task } from '../../../types';
import TaskColorIndicator from '../../../components/UI/TaskColorIndicator/TaskColorIndicator';

interface Props {
  task: Task;
}

const TaskCardMini: React.FC<Props> = ({ task }) => {
  const navigate = useNavigate();
  return (
    <Card onClick={() => navigate(`/tasks/${task._id}`)} style={profileItemCard} sx={{ position: 'relative' }}>
      <TaskColorIndicator task={task} />
      <CardContent>
        <Typography component="p" fontWeight={700}>
          {task.title}
        </Typography>
        <Typography component="p">Project: {task.project.title}</Typography>
        <Typography component="p">
          Status:{' '}
          <Typography
            component="span"
            color={
              task.status === 'To do'
                ? '#2f4f4f'
                : task.status === 'In progress'
                ? '#32CD32'
                : task.status === 'On hold'
                ? '#FFA500'
                : '#6f98f7'
            }
            fontWeight={700}
          >
            {task.status}
          </Typography>
        </Typography>
      </CardContent>
    </Card>
  );
};

export default TaskCardMini;
