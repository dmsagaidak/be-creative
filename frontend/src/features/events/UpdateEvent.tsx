import React, { useEffect } from 'react';
import { Container } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { selectEventUpdating, selectOneEvent } from './eventsSlice';
import { fetchOneEvent, updateEvent } from './eventsThunks';
import { EventMutation } from '../../types';
import EventForm from './components/EventForm';

const UpdateEvent = () => {
  const { id } = useParams() as { id: string };
  const dispatch = useAppDispatch();
  const event = useAppSelector(selectOneEvent);
  const eventUpdating = useAppSelector(selectEventUpdating);
  const navigate = useNavigate();

  useEffect(() => {
    if(id) {
      void dispatch(fetchOneEvent(id));
    }
  }, [dispatch, id]);

  const onSubmit = async (event: EventMutation) => {
    await dispatch(updateEvent({id, event})).unwrap();
    navigate(-1);
  };

  const existingEvent = event && {
    title: event.title,
    start: event.start,
    end: event.end,
  }

  return (
    <Container>
      {existingEvent &&
        <EventForm
        onSubmit={onSubmit}
        loading={eventUpdating}
        existingEvent={existingEvent}
        isEdit
        />}
    </Container>
  );
};

export default UpdateEvent;