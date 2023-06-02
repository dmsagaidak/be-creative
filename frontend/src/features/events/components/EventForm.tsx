import React, { useState } from 'react';
import { EventMutation, ValidationError } from '../../../types';
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
  error: ValidationError | null;
}

const initialState: EventMutation = {
  title: '',
  start: '',
  end: '',
}

const EventForm: React.FC<Props> = ({ onSubmit, loading, existingEvent, isEdit, error }) => {
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
  };

  const getFieldError = (fieldName: string) => {
    try {
      return error?.errors[fieldName].message;
    } catch {
      return undefined;
    }
  };

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
              error={Boolean(getFieldError('title'))}
              helperText={getFieldError('title')}
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
                slotProps={{
                  textField: {
                    required: true,
                    helperText: getFieldError('start')
                  },
                }}
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
                slotProps={{
                  textField: {
                    required: true,
                    helperText: getFieldError('end')
                  },
                }}
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