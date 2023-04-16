import React, { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { selectRegisterError } from './usersSlice';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { register } from './usersThunks';
import { RegisterMutation } from '../../types';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { Avatar, Box, Button, Container, Grid, Link, TextField, Typography } from '@mui/material';
import FileInput from '../../components/UI/FileInput/FileInput';

const Register = () => {
  const dispatch = useAppDispatch();
  const error = useAppSelector(selectRegisterError);
  const navigate = useNavigate();

  const [state, setState] = useState<RegisterMutation>({
    email: '',
    displayName: '',
    password: '',
    avatar: null,
  });


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

  const submitFormHandler = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      await dispatch(register(state)).unwrap();
      navigate('/');
    } catch (e) {
      console.log(e);
    }
  };

  const getFieldError = (fieldName: string) => {
    try {
      return error?.errors[fieldName].message;
    } catch {
      return undefined;
    }
  };


  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}>
        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <Box component="form" noValidate onSubmit={submitFormHandler} sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                required
                label="Email"
                name="email"
                type='email'
                value={state.email}
                onChange={inputChangeHandler}
                error={Boolean(getFieldError('email'))}
                helperText={Boolean(getFieldError('email'))}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                label="Display name"
                name="displayName"
                autoComplete="new-displayname"
                value={state.displayName}
                onChange={inputChangeHandler}
                error={Boolean(getFieldError('displayName'))}
                helperText={Boolean(getFieldError('displayName'))}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                name="password"
                label="Password"
                type="password"
                autoComplete="new-password"
                value={state.password}
                onChange={inputChangeHandler}
                error={Boolean(getFieldError('password'))}
                helperText={getFieldError('password')}
              />
            </Grid>
            <Grid item xs>
              <FileInput onChange={fileInputChangeHandler} name="avatar" label="Avatar" />
            </Grid>
          </Grid>
          <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
            Sign Up
          </Button>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Link component={RouterLink} to="/login" variant="body2">
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
};

export default Register;