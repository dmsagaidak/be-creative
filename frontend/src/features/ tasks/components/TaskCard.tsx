import React from 'react';
import { Card, CardContent, CardHeader, IconButton, Typography } from '@mui/material';
import {Task} from '../../../types';
import dayjs from 'dayjs';
import { useNavigate } from 'react-router-dom';
import { ArrowRight } from '@mui/icons-material';

interface Props {
  task: Task;
}

const TaskCard: React.FC<Props> = ({task}) => {
  const navigate = useNavigate();
  return (
    <Card>
      <CardHeader
        title={task.title}
        action={<IconButton onClick={() => navigate(`/tasks/${task._id}`)}><ArrowRight/></IconButton>}
      />
      <CardContent>
        <Typography component="p">
          {task.description}
        </Typography>
        <Typography component="p">
          {task.status}
        </Typography>
        <Typography component="p">
          {dayjs(task.deadline).format("DD.MM.YYYY")}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default TaskCard;