import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Alert, Button } from '@mui/material';

const ErrorPage = () => {
  const navigate = useNavigate();
  return (
    <>
      <Alert severity="error">Sorry, this item cannot be removed</Alert>
      <Button onClick={() => navigate(-1)}>OK, go back</Button>
    </>
  );
};

export default ErrorPage;