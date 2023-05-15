import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { selectOneProject } from './projectsSlice';
import { fetchOneProject, removeProject } from './projectsThunks';
import { Alert, Container, Divider, Grid, IconButton, Link, List, ListItem, Typography } from '@mui/material';
import theme from '../../theme';
import { selectUser } from '../users/usersSlice';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { pageTopStyle } from '../../styles';
import { pageBodyStyle } from '../../styles';
import { fetchTasksByProject, removeTask } from '../ tasks/tasksThunks';
import { selectTasks } from '../ tasks/tasksSlice';
import TaskItem from '../ tasks/components/TaskItem';
import AddIcon from '@mui/icons-material/Add';
import dayjs from 'dayjs';


const ProjectPage = () => {
  const { id } = useParams() as { id: string };
  const dispatch = useAppDispatch();
  const project = useAppSelector(selectOneProject);
  const tasks = useAppSelector(selectTasks);
  const user = useAppSelector(selectUser);
  const navigate = useNavigate();

  useEffect(() => {
    void dispatch(fetchOneProject(id));
    void dispatch(fetchTasksByProject(id));
  }, [dispatch, id]);

  const deleteProject = async (projectId: string) => {
    if(window.confirm('Do you really want to remove this project?')) {
      await dispatch(removeProject(projectId));
      navigate('/');
    }
  };

  const deleteTask = async (taskId: string) => {
    if(window.confirm('Do you really want to remove this task?')) {
      await dispatch(removeTask(taskId));
      await dispatch(fetchTasksByProject(id));
    }
  }

  const styleColor = project?.status === 'Not started' ?
    theme.palette.info.main : project?.status === 'Ongoing' ?
      theme.palette.success.main : 'red';

  return (
    <Container>
      <Grid container style={pageTopStyle} direction='row' justifyContent='space-between'>
        <Typography variant='h3'>{project?.title}</Typography>
        {project && user?._id === project?.leader._id ? (
          <Grid item>
            <IconButton
              onClick={() => navigate('/edit-project/' + project?._id)}
            ><EditIcon/></IconButton>
            <IconButton
              onClick={() => deleteProject(project._id)}
            ><DeleteIcon/></IconButton>
          </Grid>
        ) : (<> <Typography></Typography></>)}
      </Grid>
      <Grid container direction='column' style={pageBodyStyle}>
        <Typography component='p' style={{fontWeight: 700}}>Description:</Typography>
        <Typography component='p' sx={{pb: 1}}>{project?.description}</Typography>
        <Divider />
        <Typography component='p' style={{fontWeight: 700, paddingTop: '7px', paddingBottom: '7px'}}>Status: <Typography component='span' style={{color: styleColor}}>{project?.status}</Typography></Typography>
        <Divider />
        <List>
          <Typography style={{fontWeight: 700}}>Project team:</Typography>
          <ListItem>Leader:
            <Typography
            component='a'
            href={'/profile/'+project?.leader._id}
            style={{textDecoration: 'none', paddingLeft: '8px'}}>
              {project?.leader.displayName}
          </Typography>
          </ListItem>
          {project?.participants.map((item, idx) => (
            <ListItem key={idx}>
              {item.role}:
              <Typography
                component='a'  href={'/profile/' + item.user._id}
                style={{textDecoration: 'none', paddingLeft: '8px'}}
              >
                {item.user.displayName}
              </Typography>
            </ListItem>
          ))}
        </List>
        <Typography component="p">
          From {dayjs(project?.start).format('DD.MM.YYYY')} to {dayjs(project?.deadline).format('DD.MM.YYYY')}
        </Typography>
          <Grid item xs sx={{pb: 3}}>
            <Typography component='p' style={{fontWeight: 700}}>Tasks:{' '} <IconButton component={Link} href="/tasks/new"><AddIcon/></IconButton> </Typography>
            {tasks.length ?  tasks.map((task) => (
              <TaskItem
                key={task._id}
                task={task}
                onDelete={() => deleteTask(task._id)}
              />
              )) : (<Alert severity="info">No tasks in this project. Please push + button to add one</Alert>)}
          </Grid>
      </Grid>
    </Container>
  );
};

export default ProjectPage;