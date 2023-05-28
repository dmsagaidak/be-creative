import React, { useState } from 'react';
import { EventMutation } from '../../../types';
import { Button, Grid, TextField, Typography } from '@mui/material';

interface Props {
  onSubmit: (mutation: EventMutation) => void;
  loading: boolean;
}

const EventForm: React.FC<Props> = ({ onSubmit, loading }) => {
  const [state, setState] = useState<EventMutation>({
    title: '',
    start: '',
    end: '',
  });

  const inputChangeHandler = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const { name, value } = e.target;
    setState((prevState) => {
      return { ...prevState, [name]: value };
    });
  };

  const submitFormHandler = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(state);
  }

  return (
    <>
      <form onSubmit={submitFormHandler}>
        <Grid container direction="column">
          <Typography variant='h5'>Add event or note</Typography>
          <Grid item sx={{pb: 1}}>
            <TextField
              id="title"
              name="title"
              label="Title"
              value={state.title}
              onChange={inputChangeHandler}
              disabled={loading}
            />
          </Grid>
          <Grid item>
            <Typography component="p">Start date</Typography>
            <TextField
              type="date"
              id="start"
              name="start"
              value={state.start}
              onChange={inputChangeHandler}
              disabled={loading}
            />
          </Grid>
          <Grid item sx={{pb: 1}}>
            <Typography component="p">End date</Typography>
            <TextField
              type="date"
              id="end"
              name="end"
              value={state.end}
              onChange={inputChangeHandler}
              disabled={loading}
            />
          </Grid>
          <Grid item>
            <Button
              variant="contained"
              color="primary"
              type='submit'
              disabled={loading}
            >
              Submit
            </Button>
          </Grid>
        </Grid>
      </form>
    </>
  );
};

export default EventForm;