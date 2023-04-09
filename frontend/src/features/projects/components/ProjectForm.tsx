import React, { useState } from 'react';
import { ProjectMutation } from '../../../types';
import { Button, Container, Grid, TextField, Typography } from '@mui/material';
import { useAppSelector } from '../../../app/hooks';
import { selectProjectCreating } from '../projectsSlice';
import { selectUser } from '../../users/usersSlice';

interface Props {
  onSubmit: (mutation: ProjectMutation) => void;
}

const ProjectForm: React.FC<Props> = ({onSubmit}) => {
  const projectCreating = useAppSelector(selectProjectCreating);
  const user = useAppSelector(selectUser);

  const [state, setState] = useState<ProjectMutation>({
    title: '',
    description: '',
    start: '',
    deadline: '',
  });

  const submitFormHandler = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(state);
  };

  const inputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setState((prevState) => {
      return { ...prevState, [name]: value };
    });
  };

  console.log(user);
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
              disabled={projectCreating}
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
              disabled={projectCreating}
            />
          </Grid>
          <Grid item xs>
            <Typography component='p'>Start:</Typography>
            <TextField
              required
              type='date'
              id='start'
              name='start'
              value={state.start}
              onChange={inputChangeHandler}
              disabled={projectCreating}
            />
          </Grid>
          <Grid item xs>
            <Typography component='p'>Deadline:</Typography>
            <TextField
              required
              type='date'
              id='deadline'
              name='deadline'
              value={state.deadline}
              onChange={inputChangeHandler}
              disabled={projectCreating}
            />
          </Grid>
          <Grid item xs>
            <Button type="submit" color="success" variant="contained" disabled={projectCreating}>
              Create project
            </Button>
          </Grid>
        </Grid>
      </form>
      
    </Container>
  );
};

export default ProjectForm;