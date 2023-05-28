import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { selectOneTask } from './tasksSlice';
import { fetchOneTask, removeTask, taskToggleStatus } from './tasksThunks';
import { Button, Container, Divider, Grid, IconButton, MenuItem, TextField, Typography } from '@mui/material';
import { pageBodyStyle, pageTopStyle } from '../../styles';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import DoubleArrowIcon from '@mui/icons-material/DoubleArrow';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import { selectUser } from '../users/usersSlice';
import dayjs from 'dayjs';
import { apiUrl } from '../../constants';

const TaskPage = () => {
  const {id} = useParams() as {id: string};
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const task = useAppSelector(selectOneTask);
  const user = useAppSelector(selectUser);

  useEffect(() => {
    void dispatch(fetchOneTask(id));
  }, [dispatch, id]);

  useEffect(() => {
    setState({ status: task?.status || '' });
  }, [task]);

  const deleteTask = async (id: string) => {
    if(window.confirm('Do you really want to remove this task?')) {
      await dispatch(removeTask(id));
      const project = task?.project._id;
      navigate('/projects/' + project);
    }
  };

  const statusValue = {
    todo: 'To do',
    inProgress: 'In progress',
    onHold: 'On hold',
    done: 'Done'
  };

  const [state, setState] = useState({status: ''});

  const inputChangeHandler = async (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setState((prevState) => {
      return { ...prevState, [name]: value };
    });
  };

  const onTaskSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (task) {
      await dispatch(taskToggleStatus({...task, status: state.status}));
      await dispatch(fetchOneTask(id));
    }
  };

  const changeStatus = (
    <>
      <form onSubmit={onTaskSubmit}>
        <TextField
          select
          label="Change status"
          id="status"
          name="status"
          value={state.status}
          onChange={inputChangeHandler}
          required
        >
          <MenuItem value={statusValue.todo}>To do</MenuItem>
          <MenuItem value={statusValue.inProgress}>In progress</MenuItem>
          <MenuItem value={statusValue.onHold}>On hold</MenuItem>
          <MenuItem value={statusValue.done}>Done</MenuItem>
        </TextField>
        <Button type="submit">Change</Button>
      </form>
    </>
  );

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
        <Grid item xs sx={{pt: 1}}>
          <Typography component='p' style={{fontWeight: 700}}>Description:</Typography>
          <Typography component='p' sx={{pb: 1}}>{task?.description}</Typography>
        </Grid>
        <Divider />
        <Grid item xs sx={{pt: 2, pb: 1}}>
          <Typography component="p" style={{fontWeight: 700}}>Project</Typography>
          <Typography
            component="a"
            href={`/projects/${task?.project._id}`}
            style={{textDecoration: 'none'}}
          >{task?.project.title}
          </Typography>
        </Grid>
        <Divider/>
        <Grid item xs sx={{pt: 2, pb: 2}}>
          <Typography
            component='p'
            style={{fontWeight: 700}}
          >
            Status: {task?.status}
          </Typography>

          {user && user._id === task?.createdBy._id || user && user._id === task?.user._id  ?
            (<Typography
              component='div'
              sx={{pt: 2}}
            >
              {changeStatus}
            </Typography>) :
            (<Typography></Typography>)}

        </Grid>
        <Divider />
        <Grid item xs sx={{pt: 2, pb: 2}}>
          {task?.user ?
            (<Typography style={{fontWeight: 700}} component='p'>Assigned to
              <Typography
                component="a"
                style={{fontWeight: 700, paddingLeft: '10px', textDecoration: 'none'}}
                href={`/profile/${task.user._id}`}>
                {task.user.displayName}
              </Typography>
            </Typography>) :
            (<Typography fontWeight={700}  component='p'>Unassigned</Typography>)}
        </Grid>
        <Divider/>
        <Grid item xs sx={{pt: 2, pb: 2}}>
          <Typography
            style={{fontWeight: 700}}
            component='p'
          >
            Deadline:
            {dayjs(task?.deadline).format('DD.MM.YYYY')}
          </Typography>
        </Grid>
        <Divider/>
        <Grid item xs sx={{pt: 2, pb: 2}}>
          <Typography
            style={{fontWeight: 700, paddingTop: '7px', paddingBottom: '7px'}}
            component='div'>
            Link:
            {task?.link ?
              (<IconButton component="a" href={task.link}><DoubleArrowIcon/></IconButton>) :
              (<Typography>No link provided</Typography>)}
          </Typography>
        </Grid>
        <Divider/>
        <Grid item xs sx={{pt: 2, pb: 2}}>
          <Typography
            style={{fontWeight: 700}}
            component="div">
            PDF file:
            {task?.pdfFile ?
              (<IconButton component="a" href={apiUrl + '/' + task.pdfFile}><FileDownloadIcon/></IconButton>) :
              (<Typography>No file provided</Typography>)
            }
          </Typography>
        </Grid>
      </Grid>
    </Container>
  );
};

export default TaskPage;