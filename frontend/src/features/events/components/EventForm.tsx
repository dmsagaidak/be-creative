import React, { useState } from 'react';
import { EventMutation } from '../../../types';
import { Button, Grid, TextField, Typography } from '@mui/material';
import dayjs from 'dayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

interface Props {
  onSubmit: (mutation: EventMutation) => void;
  loading?: boolean;
  existingEvent?: EventMutation;
  isEdit?: boolean;
}

const initialState: EventMutation = {
  title: '',
  start: '',
  end: '',
}

const EventForm: React.FC<Props> = ({ onSubmit, loading, existingEvent, isEdit }) => {
  const [state, setState] = useState<EventMutation>(existingEvent || initialState);

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
          <Typography variant='h5'>{isEdit ? 'Update' : 'Add'} event or note</Typography>
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
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                label="Choose start date"
                value={dayjs(state.start)}
                onChange={(newValue) =>
                  setState((prevState) =>
                    ({...prevState, start: newValue ? newValue.format('YYYY-MM-DD') : '',}))}
                format={'DD.MM.YYYY'}
                />
            </LocalizationProvider>
          </Grid>
          <Grid item sx={{pb: 1}}>
            <Typography component="p">End date</Typography>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                label="Choose end date"
                value={dayjs(state.end)}
                onChange={(newValue) =>
              setState((prevState) =>
                ({...prevState, end: newValue ? newValue.format('YYYY-MM-DD') : '',}))}
                format={'DD.MM.YYYY'}
                />
            </LocalizationProvider>
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