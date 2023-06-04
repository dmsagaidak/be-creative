import React from 'react';
import { Card, CardContent, CardHeader, IconButton, Typography } from '@mui/material';
import { Task } from '../../../types';
import dayjs from 'dayjs';
import { useNavigate } from 'react-router-dom';
import { ArrowRight } from '@mui/icons-material';
import { itemStyle } from '../../../styles';
import TaskColorIndicator from '../../../components/UI/TaskColorIndicator/TaskColorIndicator';

interface Props {
  task: Task;
}

const TaskCard: React.FC<Props> = ({ task }) => {
  const navigate = useNavigate();
  return (
    <Card style={itemStyle} sx={{ position: 'relative' }}>
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
        <Typography component="p">{task.description}</Typography>
        <Typography component="p">
          Status:{' '}
          <Typography
            component="span"
            fontWeight={700}
            color={
              task.status === 'To do'
                ? '#2f4f4f'
                : task.status === 'In progress'
                ? '#32CD32'
                : task.status === 'On hold'
                ? '#FFA500'
                : '#6f98f7'
            }
          >
            {task.status}
          </Typography>
        </Typography>
        <Typography component="p">
          From {dayjs(task.start).format('DD.MM.YYYY')} to {dayjs(task.deadline).format('DD.MM.YYYY')}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default TaskCard;
