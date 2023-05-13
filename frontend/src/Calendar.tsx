import React, { useEffect } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from "@fullcalendar/interaction";
import timeGridPlugin from '@fullcalendar/timegrid'
import { Container } from '@mui/material';
import { DateSelectArg } from 'fullcalendar';
import { useAppDispatch, useAppSelector } from './app/hooks';
import { selectEvents } from './features/events/eventsSlice';
import { createEvent, fetchEvents } from './features/events/eventsThunks';

const Calendar = () => {
  const dispatch = useAppDispatch();
   const events = useAppSelector(selectEvents);

  useEffect(() => {
    void dispatch(fetchEvents());
  }, [dispatch]);


  let eventGuid = 0
  const createEventId = ()=> {
    return String(eventGuid++)
  }

  const handleDateSelect = async (selectInfo: DateSelectArg) => {
    let title = prompt('Please enter a new title for your event');
    let calendarApi = selectInfo.view.calendar;

    calendarApi.unselect();

    if (title) {
      const newEvent = {
        title: title,
        start: selectInfo.startStr,
        end: selectInfo.endStr,
      };

      calendarApi.addEvent({
        id: createEventId(),
        title,
        start: selectInfo.startStr,
        end: selectInfo.endStr,
        allDay: selectInfo.allDay
      });
      await dispatch(createEvent(newEvent))
    }
  };

  console.log(events)

  return (
    <Container>
      <FullCalendar
        plugins={[ dayGridPlugin, timeGridPlugin, interactionPlugin ]}
        initialView="dayGridMonth"
        events={events}
        editable={true}
        selectable={true}
        selectMirror={true}
        select={handleDateSelect}
      />
    </Container>
  );
};

export default Calendar;