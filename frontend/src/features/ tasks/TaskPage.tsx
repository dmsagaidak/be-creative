import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { selectOneTask } from './tasksSlice';
import { fetchOneTask, removeTask } from './tasksThunks';
import { Container, Divider, Grid, IconButton, Typography } from '@mui/material';
import { pageBodyStyle, pageTopStyle } from '../../styles';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { selectUser } from '../users/usersSlice';

const TaskPage = () => {
  const {id} = useParams() as {id: string};
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const task = useAppSelector(selectOneTask);
  const user = useAppSelector(selectUser);

  useEffect(() => {
    void dispatch(fetchOneTask(id));
  }, [dispatch, id]);

  const deleteTask = async (id: string) => {
    if(window.confirm('Do you really want to remove this task?')) {
      await dispatch(removeTask(id));
      const project = task?.project._id;
      navigate('/projects/' + project);
    }
  }

  console.log(task)
  return (
    <Container>
      <Grid container style={pageTopStyle} direction='row' justifyContent='space-between'>
        <Typography variant='h3'>{task?.title}</Typography>
        {task && user?._id === task.createdBy._id ?
          ( <Grid item>
            <IconButton onClick={() => navigate(`/edit-task/${task?._id}`)}>
              <EditIcon/>
            </IconButton>
            <IconButton onClick={() => deleteTask(task._id)}>
              <DeleteIcon/>
            </IconButton>
          </Grid>) :
          (<Typography></Typography>)
        }
      </Grid>
      <Grid container direction='column' style={pageBodyStyle}>
        <Typography component='p' style={{fontWeight: 700}}>Description:</Typography>
        <Typography component='p' sx={{pb: 1}}>{task?.description}</Typography>
        <Divider />
        <Typography component='p' style={{fontWeight: 700, paddingTop: '7px', paddingBottom: '7px'}}>Status: {task?.status}</Typography>
        <Divider />
        {task?.user ?
          (<Typography fontWeight={700} component='p'>Assigned to {task.user.displayName}</Typography>) :
          (<Typography fontWeight={700}  component='p'>Unassigned</Typography>)}
      </Grid>
    </Container>
  );
};

export default TaskPage;