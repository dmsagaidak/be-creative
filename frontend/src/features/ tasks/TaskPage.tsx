import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { selectOneTask } from './tasksSlice';
import { fetchOneTask, removeTask } from './tasksThunks';
import { Container, Divider, Grid, IconButton, Typography } from '@mui/material';
import { pageBodyStyle, pageTopStyle } from '../../styles';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import DoubleArrowIcon from '@mui/icons-material/DoubleArrow';
import { selectUser } from '../users/usersSlice';
import dayjs from 'dayjs';

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
          (<Typography style={{fontWeight: 700, paddingTop: '7px', paddingBottom: '7px'}} component='p'>Assigned to
            <Typography
              component="a"
              style={{fontWeight: 700, paddingLeft: '10px', textDecoration: 'none'}}
              href={`/profile/${task.user._id}`}>
              {task.user.displayName}
            </Typography>
          </Typography>) :
          (<Typography fontWeight={700}  component='p'>Unassigned</Typography>)}
        <Divider/>
        <Typography style={{fontWeight: 700, paddingTop: '7px', paddingBottom: '7px'}} component='p'>Deadline: {dayjs(task?.deadline).format('DD.MM.YYYY')}</Typography>
        <Divider/>
        <Typography
          style={{fontWeight: 700, paddingTop: '7px', paddingBottom: '7px'}}
          component='div'>
          Link:
          {task?.link ?
            (<IconButton component="a" href={task.link}><DoubleArrowIcon/></IconButton>) :
            (<Typography>No link provided</Typography>)}
        </Typography>
      </Grid>
    </Container>
  );
};

export default TaskPage;