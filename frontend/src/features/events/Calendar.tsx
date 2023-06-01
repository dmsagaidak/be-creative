import React, { useEffect, useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from "@fullcalendar/interaction";
import timeGridPlugin from '@fullcalendar/timegrid'
import { Button, Container, Dialog, DialogContent, Typography } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import {  selectEventDeleting, selectEvents, selectEventsFetching } from './eventsSlice';
import { fetchEvents, removeEvent } from './eventsThunks';
import { EventClickArg } from 'fullcalendar';
import EventItem from './components/EventItem';
import { selectUser } from '../users/usersSlice';
import { Navigate, useNavigate } from 'react-router-dom';
import CircularProgressElement from '../../components/UI/CircularProgressElement/CircularProgressElement';

const Calendar = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectUser);
  const events = useAppSelector(selectEvents);
  const navigate = useNavigate();
  const eventsFetching = useAppSelector(selectEventsFetching);
  const eventDeleting = useAppSelector(selectEventDeleting);
  const [openEventDialog, setOpenEventDialog] = useState(false);
  const [currentEvent, setCurrentEvent] = useState<EventClickArg | null>(null);

  useEffect(() => {
    void dispatch(fetchEvents());
  }, [dispatch]);

  const handleEventClick = (clickInfo: EventClickArg) => {
    setCurrentEvent(clickInfo);
    setOpenEventDialog(true);
    console.log(clickInfo)
  };

  const deleteEvent = async (id: string) => {
    if(window.confirm('Do you really want to remove this event?')) {
      await dispatch(removeEvent(id));
      setOpenEventDialog(false);
      await dispatch(fetchEvents());
    }
  };

  if(!user) {
    return <Navigate to={'/login'}/>
  }

  return (
    <Container>
      <Button type="button" onClick={() => navigate('/events/new')}>Add event</Button>

      {eventsFetching ?
        <CircularProgressElement/> :
        (<FullCalendar
          plugins={[ dayGridPlugin, timeGridPlugin, interactionPlugin ]}
          initialView="dayGridMonth"
          events={events}
          editable={true}
          selectable={true}
          selectMirror={true}
          eventClick={handleEventClick}
        />)}
      <Dialog open={openEventDialog} onClose={() => setOpenEventDialog(false)}>
        <DialogContent>
          {currentEvent
            &&
            (<>
              <EventItem
                title={currentEvent.event._def.title}
                start={currentEvent.event._instance?.range.start}
                end={currentEvent.event._instance?.range.end}
                createdBy={currentEvent.event._def.extendedProps.createdBy}
              />
              {user?._id === currentEvent.event._def.extendedProps.createdBy._id ?
                (
                  <>
                    <Button
                      variant="outlined"
                      color="info"
                      onClick={() => navigate('/edit-event/' + currentEvent.event._def.extendedProps._id)}
                      sx={{mr: 3}}
                    >
                      Edit
                    </Button>
                    <Button
                      variant="outlined"
                      color="error"
                      onClick={() => deleteEvent(currentEvent.event._def.extendedProps._id)}
                      disabled={eventDeleting === currentEvent.event._def.extendedProps._id}
                    >
                      Remove
                    </Button>
                  </>
                  ) :
                  (<Typography></Typography>)}
            </>)
          }
        </DialogContent>
      </Dialog>
    </Container>
  );
};

export default Calendar;