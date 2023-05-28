import React, { useEffect, useState } from 'react';
import { TaskMutation, ValidationError } from '../../../types';
import {
  Button, CircularProgress,
  Container,
  Grid,
  MenuItem,
  TextField, Typography,
} from '@mui/material';
import { fetchProjectsByUser } from '../../projects/projectsThunks';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { selectUser, selectUsers } from '../../users/usersSlice';
import { selectProjects } from '../../projects/projectsSlice';
import { fetchUsers } from '../../users/usersThunks';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';
import FileInput from '../../../components/UI/FileInput/FileInput';

interface Props {
  onSubmit: (mutation: TaskMutation) => void;
  loading?: boolean;
  fetchTaskLoading?: boolean;
  existingTask?: TaskMutation;
  error: ValidationError | null;
  isEdit?: boolean;
}

const initialState: TaskMutation = {
  project: '',
  title: '',
  description: '',
  status: '',
  user: '',
  link: '',
  pdfFile: null,
  deadline: '',
}

const status = {
  todo: 'To do',
  inProgress: 'In progress',
  onHold: 'On hold',
  done: 'Done'
}

const TaskForm: React.FC<Props> = ({onSubmit, existingTask, fetchTaskLoading, loading, isEdit, error}) => {
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectUser);
  const projects = useAppSelector(selectProjects);
  const users = useAppSelector(selectUsers);

  const [state, setState] = useState<TaskMutation>(existingTask || initialState);

  useEffect(() => {
    if(user) {
      void dispatch(fetchProjectsByUser(user._id));
      const organization = user.organization;
      void dispatch(fetchUsers({organization}))
    }
  }, [dispatch, user]);

  const submitFormHandler = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(state);
  };

  const inputChangeHandler = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setState((prevState) => {
      return { ...prevState, [name]: value };
    });
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
        <Typography variant='h5' sx={{pb: 2}}>
          {isEdit ? 'Update' : 'Create new'} task
          {fetchTaskLoading && (<CircularProgress size={20} sx={{ ml: 1 }} />)}
        </Typography>
        <Grid container direction='column' spacing={2}>
          <Grid item xs>
            <TextField
              select
              label="Choose project"
              id="project"
              name="project"
              value={state.project}
              onChange={inputChangeHandler}
              required
              disabled={loading}
            >
              <MenuItem value="" disabled>
                Please, choose a project{' '}
              </MenuItem>
              {projects.map((project) => (
                <MenuItem key={project._id} value={project._id}>{project.title}</MenuItem>
              ))}
            </TextField>
          </Grid>
          <Grid item xs>
            <TextField
              label="Title"
              id="title"
              name="title"
              value={state.title}
              onChange={inputChangeHandler}
              required
              disabled={loading}
            />
          </Grid>
          <Grid item xs>
            <TextField
              multiline
              rows={3}
              label="Description"
              id='description'
              name="description"
              value={state.description}
              onChange={inputChangeHandler}
              required
              disabled={loading}
            />
          </Grid>
          <Grid item xs>
            <TextField
              select
              label="Choose status"
              id="status"
              name="status"
              value={state.status}
              onChange={inputChangeHandler}
              required
              disabled={loading}
            >
              <MenuItem value={status.todo}>To do</MenuItem>
              <MenuItem value={status.inProgress}>In progress</MenuItem>
              <MenuItem value={status.onHold}>On hold</MenuItem>
              <MenuItem value={status.done}>Done</MenuItem>
            </TextField>
          </Grid>
          <Grid item xs>
            <TextField
              select
              label="User"
              id="user"
              name="user"
              value={state.user}
              onChange={inputChangeHandler}
              disabled={loading}
            >
              {users.map((user) => (
                <MenuItem key={user._id} value={user._id}>{user.displayName}</MenuItem>
              ))}
            </TextField>
          </Grid>
          <Grid item xs>
            <TextField
              label="Link"
              id="link"
              name="link"
              value={state.link}
              onChange={inputChangeHandler}
              disabled={loading}
            />
          </Grid>
          <Grid item xs>
            <FileInput
              onChange={fileInputChangeHandler}
              name="pdfFile"
              label="Upload File"
              errorCheck={getFieldError}/>
          </Grid>
          <Grid item xs>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                label="Choose deadline date"
                value={dayjs(state.deadline)}
                onChange={(newValue) =>
                  setState((prevState) =>
                    ({...prevState, deadline: newValue ? newValue.format('YYYY-MM-DD') : '',}))}
                format={'DD.MM.YYYY'}
              />
            </LocalizationProvider>
          </Grid>
          <Grid item xs>
            <Button
              type="submit"
              color="success"
              variant="contained"
              disabled={loading}
            >
              {isEdit? 'Update' : 'Create'} task</Button>
          </Grid>
        </Grid>
      </form>
    </Container>
  );
};

export default TaskForm;