import React, { useEffect, useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from "@fullcalendar/interaction";
import timeGridPlugin from '@fullcalendar/timegrid'
import { Button, Container, Dialog, DialogContent, Grid, TextField, Typography } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { selectEvents } from '../events/eventsSlice';
import { createEvent, fetchEvents } from '../events/eventsThunks';
import { EventMutation } from '../../types';

const Calendar = () => {
  const dispatch = useAppDispatch();
  const events = useAppSelector(selectEvents);
  const [open, setOpen] = useState(false);

  const [state, setState] = useState<EventMutation>({
    title: '',
    start: '',
    end: '',
  })

  useEffect(() => {
    void dispatch(fetchEvents());
  }, [dispatch]);

  const closeDialog = () => {
    setOpen(false);
  }

  const inputChangeHandler = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const { name, value } = e.target;
    setState((prevState) => {
      return { ...prevState, [name]: value };
    });
  };

  const onFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await dispatch(createEvent(state));
    await dispatch(fetchEvents());
    setOpen(false)
  }

 console.log(events)

  return (
    <Container>
      <Button type="button" onClick={() => setOpen(true)}>Add event</Button>
      <FullCalendar
        plugins={[ dayGridPlugin, timeGridPlugin, interactionPlugin ]}
        initialView="dayGridMonth"
        events={events}
        editable={true}
        selectable={true}
        selectMirror={true}
      />
      <Dialog open={open} onClose={closeDialog}>
        <DialogContent>
          <form onSubmit={onFormSubmit}>
            <Grid container direction="column">
              <Typography variant='h5'>Add event or note</Typography>
              <Grid item sx={{pb: 1}}>
                <TextField
                  id="title"
                  name="title"
                  label="Title"
                  value={state.title}
                  onChange={inputChangeHandler}
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
                />
              </Grid>
              <Grid item>
                <Button variant="contained" color="primary" type='submit'>Submit</Button>
              </Grid>
            </Grid>
          </form>
        </DialogContent>
      </Dialog>
    </Container>
  );
};

export default Calendar;