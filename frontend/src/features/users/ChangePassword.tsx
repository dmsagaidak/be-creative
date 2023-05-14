import React from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { selectPasswordChangeError, selectPasswordChanging, selectUser } from './usersSlice';
import { IChangePassword } from '../../types';
import { changePassword } from './usersThunks';
import { Navigate, useNavigate } from 'react-router-dom';
import { Alert, Button, Container, Grid, TextField, Typography } from '@mui/material';

const ChangePassword = () => {
  const dispatch = useAppDispatch();
  const error = useAppSelector(selectPasswordChangeError);
  const changing = useAppSelector(selectPasswordChanging);
  const navigate = useNavigate();
  const user = useAppSelector(selectUser);

  const [state, setState] = React.useState<IChangePassword>({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  const inputChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setState((prevState) => ({ ...prevState, [name]: value }));
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await dispatch(changePassword(state)).unwrap();
    navigate('/');
  };

  if(!user){
    return <Navigate to={'/login'}/>
  }

  return (
    <Container component="main" maxWidth="lg">
      <Typography variant='h5' sx={{pb: 2}}>Change your password</Typography>
      {error && (
        <Alert severity="error" sx={{ mt: 3, width: '100%' }}>
          {error.error}
        </Alert>
      )}
      <form onSubmit={onSubmit}>
        <Grid container direction="column" spacing={2}>
          <Grid item xs>
            <TextField
              type="password"
              id="currentPassword"
              name="currentPassword"
              label="Input your current password"
              value={state.currentPassword}
              onChange={inputChangeHandler}
              disabled={changing}
              required
            />
          </Grid>
          <Grid item xs>
            <TextField
              type="password"
              id="newPassword"
              name="newPassword"
              label="Input new password"
              value={state.newPassword}
              onChange={inputChangeHandler}
              disabled={changing}
              required
            />
          </Grid>
          <Grid item xs>
            <TextField
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              label="Confirm new password"
              value={state.confirmPassword}
              onChange={inputChangeHandler}
              disabled={changing}
              required
            />
          </Grid>
          <Grid item xs>
            <Button type="submit" color="warning" variant="contained" disabled={changing}>
              Change password
            </Button>
          </Grid>
        </Grid>
      </form>
    </Container>
  );
};

export default ChangePassword;