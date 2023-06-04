import React from 'react';
import { Card, Typography } from '@mui/material';
import { profileItemCard } from '../../../styles';
import { useNavigate } from 'react-router-dom';
import { Task } from '../../../types';

interface Props {
  task: Task;
}

const TaskCardMini: React.FC<Props> = ({ task }) => {
  const navigate = useNavigate();
  return (
    <Card onClick={() => navigate(`/tasks/${task._id}`)} style={profileItemCard}>
      <Typography component="p" fontWeight={700}>
        {task.title}
      </Typography>
      <Typography component="p">Project: {task.project.title}</Typography>
      <Typography component="p">Status: {task.status}</Typography>
    </Card>
  );
};

export default TaskCardMini;
