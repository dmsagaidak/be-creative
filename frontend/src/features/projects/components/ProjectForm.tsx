import React, { useEffect, useState } from 'react';
import { ProjectMutation, ValidationError } from '../../../types';
import { Button, Container, Grid, MenuItem, TextField, Typography } from '@mui/material';
import FileInput from '../../../components/UI/FileInput/FileInput';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { selectUser, selectUsers } from '../../users/usersSlice';
import { fetchUsers } from '../../users/usersThunks';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';

interface Props {
  onSubmit: (project: ProjectMutation) => void;
  loading: boolean;
  error: ValidationError | null;
  existingProject?: ProjectMutation;
  isEdit?: boolean;
}

const initialState: ProjectMutation = {
  title: '',
  description: '',
  start: '',
  deadline: '',
  image: null,
  participants: []
}

const ProjectForm: React.FC<Props> = ({onSubmit, loading, error, existingProject, isEdit}) => {
  const [state, setState] = useState<ProjectMutation>(existingProject || initialState);
  const user = useAppSelector(selectUser);
  const users = useAppSelector(selectUsers);
  const organization = user?.organization;
  const dispatch = useAppDispatch();

  const submitFormHandler = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(state);
    setState(initialState);
  };

  useEffect(() => {
    void dispatch(fetchUsers({organization}))
  }, [dispatch])

  const inputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setState((prevState) => {
      return { ...prevState, [name]: value };
    });
  };

  const participantsChangeHandler = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, index: number) => {
    const { name, value } = e.target;
    setState((prevState) => {
      const newParticipants = [...prevState.participants];
      newParticipants[index] = {...newParticipants[index], [name]: value};
      return {...prevState, participants: newParticipants}
    });
  };

  const addParticipant = () => {
    setState((prevState) => {
      const updatedParticipants = [...prevState.participants, {role: '', user: ''}]
      return {...prevState, participants: updatedParticipants}
    })
  };

  const removeParticipant = (index: number) => {
    setState((prevState) => {
      const updatedParticipants = [...prevState.participants];
      updatedParticipants.splice(index, 1);
      return {...prevState, participants: updatedParticipants};
    })
  };

  const fileInputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, files } = e.target;
    setState((prevState) => ({
      ...prevState,
      [name]: files && files[0] ? files[0] : null,
    }));
  };

  const getFieldError = (fieldName: string) => {
    try {
      return error?.errors[fieldName].message;
    } catch {
      return undefined;
    }
  };

  return (
    <Container component="main" maxWidth="lg">
      <form onSubmit={submitFormHandler} autoComplete="off">
        <Grid container direction='column' spacing={2}>
          <Grid item xs>
            <TextField
              required
              id='title'
              name='title'
              label="Title"
              value={state.title}
              onChange={inputChangeHandler}
              disabled={loading}
              error={Boolean(getFieldError('title'))}
              helperText={getFieldError('title')}
            />
          </Grid>
          <Grid item xs>
            <TextField
              multiline
              rows={3}
              required
              id='description'
              name='description'
              label="Description"
              value={state.description}
              onChange={inputChangeHandler}
              disabled={loading}
              error={Boolean(getFieldError('description'))}
              helperText={getFieldError('description')}
            />
          </Grid>
          <Grid item xs>
            <Typography component='p'>Start:</Typography>
            <LocalizationProvider
              dateAdapter={AdapterDayjs}
            >
              <DatePicker
              label="Choose date"
              value={dayjs(state.start)}
              onChange={(newValue) =>
                setState((prevState) =>
                  ({...prevState, start: newValue ? newValue.format('YYYY-MM-DD') : '',}))}
              />
            </LocalizationProvider>
          </Grid>
          <Grid item xs>
            <Typography component='p'>Deadline:</Typography>
            <LocalizationProvider
              dateAdapter={AdapterDayjs}>
              <DatePicker
                label="Choose the date"
                value={dayjs(state.deadline)}
                onChange={(newValue) =>
                  setState((prevState) =>
                    ({...prevState, deadline: newValue ? newValue.format('YYYY-MM-DD') : '',}))}
              />
            </LocalizationProvider>
          </Grid>
          <Grid item xs>
            <FileInput
              onChange={fileInputChangeHandler}
              name="image"
              label="Image"
              type="image/*"
              errorCheck={getFieldError}
            />
          </Grid>
          <Grid item xs>
            <Typography component='p' sx={{mb: 1}}>Participants:</Typography>
            {state.participants.map((item, index) => (
              <Grid item container key={index} direction="column">
                <Grid item xs sx={{mb: 1}}>
                  <TextField
                    id='role'
                    label='Role'
                    name='role'
                    value={item.role}
                    onChange={(e) => participantsChangeHandler(e, index)}
                    required
                    error={Boolean(getFieldError('role'))}
                    helperText={getFieldError('role')}
                  />
                </Grid>
                <Grid item xs>
                  <TextField
                    select
                    id='user'
                    label='User'
                    name='user'
                    value={item.user}
                    onChange={(e) => participantsChangeHandler(e, index)}
                    required
                    error={Boolean(getFieldError('user'))}
                    helperText={getFieldError('user')}
                  >
                    {users.map((user) => (
                      <MenuItem key={user._id} value={user._id}>{user.displayName}</MenuItem>
                    ))}
                  </TextField>
                </Grid>
                {state.participants.length > 1 &&
                  (<Button onClick={() => removeParticipant(index)} color='error'>Remove</Button>)}
              </Grid>
            ))}
            <Button type='button' color='primary' onClick={addParticipant}>Add participant</Button>
          </Grid>
          <Grid item xs>
            <Button type="submit" color="success" variant="contained" disabled={loading}>
              {isEdit? 'Update' : 'Create'} project
            </Button>
          </Grid>
        </Grid>
      </form>
      
    </Container>
  );
};

export default ProjectForm;