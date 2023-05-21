import React, { useEffect, useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from "@fullcalendar/interaction";
import timeGridPlugin from '@fullcalendar/timegrid'
import { Button, Container, Dialog, DialogContent } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { selectEvents } from './eventsSlice';
import { createEvent, fetchEvents } from './eventsThunks';
import { EventMutation } from '../../types';
import EventForm from './components/EventForm';
import { EventClickArg } from 'fullcalendar';
import EventItem from './components/EventItem';

const Calendar = () => {
  const dispatch = useAppDispatch();
  const events = useAppSelector(selectEvents);
  const [openCreateDialog, setOpenCreateDialog] = useState(false);
  const [openEventDialog, setOpenEventDialog] = useState(false);
  const [currentEvent, setCurrentEvent] = useState<EventClickArg | null>(null);

  useEffect(() => {
    void dispatch(fetchEvents());
  }, [dispatch]);

  const closeDialog = () => {
    setOpenCreateDialog(false);
  }

  const onFormSubmit = async (mutation: EventMutation) => {
    await dispatch(createEvent(mutation));
    await dispatch(fetchEvents());
    setOpenCreateDialog(false)
  };

  const handleEventClick = (clickInfo: EventClickArg) => {
    setCurrentEvent(clickInfo);
    setOpenEventDialog(true);
    console.log(currentEvent)
  };

 console.log(events)

  return (
    <Container>
      <Button type="button" onClick={() => setOpenCreateDialog(true)}>Add event</Button>
      <FullCalendar
        plugins={[ dayGridPlugin, timeGridPlugin, interactionPlugin ]}
        initialView="dayGridMonth"
        events={events}
        editable={true}
        selectable={true}
        selectMirror={true}
        eventClick={handleEventClick}
      />
      <Dialog open={openCreateDialog} onClose={closeDialog}>
        <DialogContent>
          <EventForm onSubmit={onFormSubmit}/>
        </DialogContent>
      </Dialog>
      <Dialog open={openEventDialog} onClose={() => setOpenEventDialog(false)}>
        <DialogContent>
          {currentEvent
            &&
            (<EventItem
              title={currentEvent.event._def.title}
              start={currentEvent.event._instance?.range.start}
              end={currentEvent.event._instance?.range.end}
            />)
          }
        </DialogContent>
      </Dialog>
    </Container>
  );
};

export default Calendar;