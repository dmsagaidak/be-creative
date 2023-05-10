import React, { useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from "@fullcalendar/interaction";
import timeGridPlugin from '@fullcalendar/timegrid'
import { Container } from '@mui/material';
import { DateSelectArg } from 'fullcalendar';

interface Event {
  title: string;
  start: string;
  end: string;
}
const Calendar = () => {
  const [events, setEvents] = useState<Event[]>( [{title: 'Test', start: '2023-05-01', end: '2023-05-04'}])

  let eventGuid = 0
  const createEventId = ()=> {
    return String(eventGuid++)
  }

  const handleDateSelect = (selectInfo: DateSelectArg) => {
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
      setEvents((prevEvents) => [...prevEvents, newEvent]);
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