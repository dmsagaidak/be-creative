import React from 'react';
import { Card, CardContent, Typography } from '@mui/material';
import { profileItemCard } from '../../../styles';
import { useNavigate } from 'react-router-dom';
import { Task } from '../../../types';

interface Props {
  task: Task;
}

const TaskCardMini: React.FC<Props> = ({ task }) => {
  const navigate = useNavigate();
  return (
    <Card onClick={() => navigate(`/tasks/${task._id}`)} style={profileItemCard} sx={{ position: 'relative' }}>
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
      ></Typography>
      <CardContent>
        <Typography component="p" fontWeight={700}>
          {task.title}
        </Typography>
        <Typography component="p">Project: {task.project.title}</Typography>
        <Typography component="p">Status: {task.status}</Typography>
      </CardContent>
    </Card>
  );
};

export default TaskCardMini;
