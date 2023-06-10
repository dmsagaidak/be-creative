import React from 'react';
import { Grid, Typography } from '@mui/material';
import dayjs from 'dayjs';
import { Project, Task, User } from '../../../types';

interface Props {
  title: string;
  description: string;
  createdBy: User;
  start?: Date;
  end?: Date;
  project?: Project;
  task?: Task;
}

const EventItem: React.FC<Props> = ({ title, description, start, end, createdBy, project, task }) => {
  return (
    <Grid container spacing={2} direction="column" sx={{ p: 2 }}>
      <Typography variant="h5" component="p">
        {title}
      </Typography>
      <Typography component="p">
        {' '}
        <Typography component="span" fontWeight={700}>
          Description:{' '}
        </Typography>{' '}
        {description}
      </Typography>
      <Typography component="p">
        <Typography component="span" fontWeight={700}>
          Start:{' '}
        </Typography>{' '}
        {dayjs(start).format('DD.MM.YYYY')}
      </Typography>
      <Typography component="p">
        <Typography component="span" fontWeight={700}>
          End:{' '}
        </Typography>{' '}
        {dayjs(end).format('DD.MM.YYYY')}
      </Typography>
      {project ? (
        <Typography component="p">
          <Typography component="span" fontWeight={700}>
            Project:{' '}
          </Typography>{' '}
          <Typography component="a" href={`/projects/${project._id}`}>
            {project.title}
          </Typography>
        </Typography>
      ) : (
        <></>
      )}
      {task ? (
        <Typography component="p">
          <Typography component="span" fontWeight={700}>
            Task:{' '}
          </Typography>{' '}
          <Typography component="a" href={`/tasks/${task._id}`}>
            {task.title}
          </Typography>
        </Typography>
      ) : (
        <></>
      )}
      <Typography component="p">
        <Typography component="span" fontWeight={700}>
          Added{' '}
        </Typography>{' '}
        <Typography component="a" href={`/profile/${createdBy._id}`}>
          {createdBy.displayName}
        </Typography>
      </Typography>
    </Grid>
  );
};

export default EventItem;
