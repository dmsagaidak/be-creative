import React from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { selectEventCreating, selectEventCreatingError } from './eventsSlice';
import { useNavigate } from 'react-router-dom';
import { EventMutation } from '../../types';
import { createEvent } from './eventsThunks';
import { Container } from '@mui/material';
import EventForm from './components/EventForm';

const NewEvent = () => {
  const dispatch = useAppDispatch();
  const eventCreating = useAppSelector(selectEventCreating);
  const error = useAppSelector(selectEventCreatingError);
  const navigate = useNavigate();

  const onFormSubmit = async (mutation: EventMutation) => {
    await dispatch(createEvent(mutation)).unwrap();
    navigate(-1);
  };

  return (
    <Container>
      <EventForm onSubmit={onFormSubmit} loading={eventCreating} error={error} />
    </Container>
  );
};

export default NewEvent;
