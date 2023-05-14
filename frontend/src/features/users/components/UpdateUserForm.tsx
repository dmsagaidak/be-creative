import React, { useState } from 'react';
import { UpdateUserMutation } from '../../../types';
import { Button, Container, Grid, TextField, Typography } from '@mui/material';
import FileInput from '../../../components/UI/FileInput/FileInput';
import { useAppSelector } from '../../../app/hooks';
import { selectUpdateUserError } from '../usersSlice';

interface Props {
  onSubmit: (updateMutation: UpdateUserMutation) => void;
  existingUser?: UpdateUserMutation;
}

const initialState: UpdateUserMutation = {
  email: '',
  displayName: '',
  avatar: null,
  organization: '',
}

const UpdateUserForm: React.FC<Props> = ({onSubmit, existingUser}) => {
  const [state, setState] = useState<UpdateUserMutation>(existingUser || initialState);
  const error = useAppSelector(selectUpdateUserError);

  const inputChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
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

  const submitFormHandler = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(state);
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
      <Typography variant='h5' sx={{pb: 2}}>Update your profile</Typography>
      <form onSubmit={submitFormHandler}>
        <Grid container direction='column' spacing={2}>
          <Grid item xs>
            <TextField
              type="email"
              id="email"
              name="email"
              label="Email"
              value={state.email}
              onChange={inputChangeHandler}
              error={Boolean(getFieldError('email'))}
              helperText={getFieldError('email')}
              required
            />
          </Grid>
          <Grid item xs>
            <TextField
              id="displayName"
              name="displayName"
              label="Display name"
              value={state.displayName}
              onChange={inputChangeHandler}
              error={Boolean(getFieldError('displayName'))}
              helperText={getFieldError('displayName')}
              required
            />
          </Grid>
          <Grid item xs>
            <FileInput onChange={fileInputChangeHandler} name="avatar" label="Update your photo"/>
          </Grid>
          <Grid item xs>
            <TextField
              id="organization"
              name="organization"
              label="Organization"
              value={state.organization}
              onChange={inputChangeHandler}
              error={Boolean(getFieldError('organization'))}
              helperText={getFieldError('organization')}
              required
            />
          </Grid>
          <Grid item xs>
            <Button type="submit" variant="contained" color="primary">Update profile info</Button>
          </Grid>
        </Grid>
      </form>
    </Container>
  );
};

export default UpdateUserForm;