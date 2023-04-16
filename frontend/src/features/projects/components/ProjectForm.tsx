import React, { useState } from 'react';
import { ProjectMutation } from '../../../types';
import { Button, Container, Grid, TextField, Typography } from '@mui/material';
import { useAppSelector } from '../../../app/hooks';
import { selectProjectCreating } from '../projectsSlice';
import { ParticipantMutation } from '../../../types';
import FileInput from '../../../components/UI/FileInput/FileInput';

interface Props {
  onSubmit: (project: ProjectMutation, participants: ParticipantMutation[]) => void;
}

const ProjectForm: React.FC<Props> = ({onSubmit}) => {
  const projectCreating = useAppSelector(selectProjectCreating);

  const [state, setState] = useState<ProjectMutation>({
    title: '',
    description: '',
    start: '',
    deadline: '',
    image: ''
  });

  const [participants, setParticipants] = useState<ParticipantMutation[]>([{role: '', user: ''}])

  const submitFormHandler = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(state, participants);
  };

  const inputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setState((prevState) => {
      return { ...prevState, [name]: value };
    });
  };

  const participantsChangeHandler = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, index: number) => {
    const { name, value } = e.target;
    setParticipants((prevState) => {
      const newParticipants = [...prevState];
      newParticipants[index] = {...newParticipants[index], [name]: value};
      return newParticipants
    });
  };

  const addParticipant = () => {
    setParticipants((prevState) => {
      return [...prevState, {role: '', user: ''}]
    })
  };

  const removeParticipant = (index: number) => {
    const arrCopy = [...participants];
    arrCopy.splice(index, 1);
    setParticipants(arrCopy);
  };

  const fileInputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, files } = e.target;
    setState((prevState) => ({
      ...prevState,
      [name]: files && files[0] ? files[0] : null,
    }));
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
              type='datetime-local'
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
              type='datetime-local'
              id='deadline'
              name='deadline'
              value={state.deadline}
              onChange={inputChangeHandler}
              disabled={projectCreating}
            />
          </Grid>
          <Grid item xs>
            <FileInput onChange={fileInputChangeHandler} name="image" label="Image" />
          </Grid>
          <Grid item xs>
            Participants:
            {participants.map((item, index) => (
              <Grid item key={index}>
                <TextField
                  id='role'
                  label='Role'
                  name='role'
                  value={item.role}
                  onChange={(e) => participantsChangeHandler(e, index)}
                  required
                />
                <TextField
                  id='user'
                  label='User'
                  name='user'
                  value={item.user}
                  onChange={(e) => participantsChangeHandler(e, index)}
                  required
                />
                {participants.length > 1 &&
                  (<Button onClick={() => removeParticipant(index)} color='error'>Remove</Button>)}
              </Grid>
            ))}
            <Button type='button' color='primary' onClick={addParticipant}>Add participant</Button>
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