import React from 'react';
import { Grid, Typography } from '@mui/material';
import dayjs from 'dayjs';
import { User } from '../../../types';

interface Props {
  title: string;
  createdBy: User;
  start?: Date;
  end?: Date;
}

const EventItem: React.FC<Props> = ({ title, start, end, createdBy }) => {
  return (
    <Grid container spacing={2} direction="column" sx={{ p: 2 }}>
      <Typography variant="h5" component="p">
        {title}
      </Typography>
      <Typography component="p">Start: {dayjs(start).format('DD.MM.YYYY')}</Typography>
      <Typography component="p">End: {dayjs(end).format('DD.MM.YYYY')}</Typography>
      <Typography component="p">Added {createdBy.displayName}</Typography>
    </Grid>
  );
};

export default EventItem;
