import React from 'react';
import { Grid, Typography } from '@mui/material';
import dayjs from 'dayjs';
import { Project, Task, User } from '../../../types';

interface Props {
  title: string;
  createdBy: User;
  start?: Date;
  end?: Date;
  project?: Project;
  task?: Task;
}

const EventItem: React.FC<Props> = ({ title, start, end, createdBy, project, task }) => {
  return (
    <Grid container spacing={2} direction="column" sx={{ p: 2 }}>
      <Typography variant="h5" component="p">
        {title}
      </Typography>
      <Typography component="p">Start: {dayjs(start).format('DD.MM.YYYY')}</Typography>
      <Typography component="p">End: {dayjs(end).format('DD.MM.YYYY')}</Typography>
      {project ? (
        <Typography component="p">
          Project:{' '}
          <Typography component="a" href={`/projects/${project._id}`}>
            {project.title}
          </Typography>
        </Typography>
      ) : (
        <></>
      )}
      {task ? (
        <Typography component="p">
          Task:{' '}
          <Typography component="a" href={`/tasks/${task._id}`}>
            {task.title}
          </Typography>
        </Typography>
      ) : (
        <></>
      )}
      <Typography component="p">
        Added{' '}
        <Typography component="a" href={`/profile/${createdBy._id}`}>
          {createdBy.displayName}
        </Typography>
      </Typography>
    </Grid>
  );
};

export default EventItem;
