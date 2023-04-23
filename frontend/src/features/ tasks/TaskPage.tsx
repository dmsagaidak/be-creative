import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { selectOneTask } from './tasksSlice';
import { fetchOneTask } from './tasksThunks';
import { Container, Divider, Grid, Typography } from '@mui/material';
import { pageBodyStyle, pageTopStyle } from '../../styles';


const TaskPage = () => {
  const {id} = useParams() as {id: string};
  const dispatch = useAppDispatch();
  const task = useAppSelector(selectOneTask);

  useEffect(() => {
    void dispatch(fetchOneTask(id));
  }, [dispatch, id]);

  console.log(task)
  return (
    <Container>
      <Grid container style={pageTopStyle} direction='row' justifyContent='space-between'>
        <Typography variant='h3'>{task?.title}</Typography>
      </Grid>
      <Grid container direction='column' style={pageBodyStyle}>
        <Typography component='p' style={{fontWeight: 700}}>Description:</Typography>
        <Typography component='p' sx={{pb: 1}}>{task?.description}</Typography>
        <Divider />
        <Typography component='p' style={{fontWeight: 700, paddingTop: '7px', paddingBottom: '7px'}}>Status: {task?.status}</Typography>
        <Divider />
      </Grid>
    </Container>
  );
};

export default TaskPage;