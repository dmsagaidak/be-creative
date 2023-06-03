import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { selectUserById } from './usersSlice';
import { findUserById } from './usersThunks';
import { fetchTasksByUser } from '../ tasks/tasksThunks';
import { Alert, Container, Grid, Typography } from '@mui/material';
import { selectTasks } from '../ tasks/tasksSlice';
import TaskCard from '../ tasks/components/TaskCard';

const MyTasks = () => {
  const { id } = useParams() as { id: string };
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectUserById);
  const tasks = useAppSelector(selectTasks);

  useEffect(() => {
    void dispatch(findUserById(id));
    void dispatch(fetchTasksByUser(id));
  }, [dispatch, id]);

  return (
    <Container>
      <Grid container direction="column">
        <Typography variant="h6">{user?.displayName}'s tasks: </Typography>
        {tasks.length ?  tasks.map((task) => (
          <TaskCard key={task._id} task={task}/>
        )) : (<Alert severity="info">This user has no tasks assigned</Alert>)}
      </Grid>
    </Container>

  );
};

export default MyTasks;