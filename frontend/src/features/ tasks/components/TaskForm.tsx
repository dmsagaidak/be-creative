import React, { useEffect, useState } from 'react';
import { TaskMutation } from '../../../types';
import {
  Button,
  Container,
  Grid,
  MenuItem,
  TextField,
} from '@mui/material';
import { fetchProjectsByUser } from '../../projects/projectsThunks';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { selectUser } from '../../users/usersSlice';
import { selectProjects } from '../../projects/projectsSlice';

interface Props {
  onSubmit: (mutation: TaskMutation) => void;
}

const TaskForm: React.FC<Props> = ({onSubmit}) => {
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectUser);
  const projects = useAppSelector(selectProjects);

  const [state, setState] = useState<TaskMutation>({
    project: '',
    title: '',
    description: '',
    status: '',
    user: '',
    link: '',
    deadline: '',
  });

  useEffect(() => {
    if(user) {
      void dispatch(fetchProjectsByUser(user._id));
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

  return (
    <Container component="main" maxWidth="lg">
      <form onSubmit={submitFormHandler} autoComplete="off">
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
            >
              <MenuItem value="To do">To do</MenuItem>
              <MenuItem value="In progress">In progress</MenuItem>
              <MenuItem value="Done">Done</MenuItem>
            </TextField>
          </Grid>
          <Grid item xs>
            <TextField
              label="User"
              id="user"
              name="user"
              value={state.user}
              onChange={inputChangeHandler}
            />
          </Grid>
          <Grid item xs>
            <TextField
              label="Link"
              id="link"
              name="link"
              value={state.link}
              onChange={inputChangeHandler}
            />
          </Grid>
          <Grid item xs>
            <TextField
              required
              type='datetime-local'
              id='deadline'
              name="deadline"
              value={state.deadline}
              onChange={inputChangeHandler}
            />
          </Grid>
          <Grid item xs>
            <Button type="submit" color="success" variant="contained">Create task</Button>
          </Grid>
        </Grid>
      </form>
    </Container>
  );
};

export default TaskForm;