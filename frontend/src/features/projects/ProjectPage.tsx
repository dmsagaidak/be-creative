import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { selectOneProject } from './projectsSlice';
import { fetchOneProject, removeProject } from './projectsThunks';
import { Container, Divider, Grid, IconButton, List, ListItem, Typography } from '@mui/material';
import theme from '../../theme';
import { selectUser } from '../users/usersSlice';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { pageTopStyle } from '../../styles';
import { pageBodyStyle } from '../../styles';
import { fetchTasksByProject } from '../ tasks/tasksThunks';
import { selectTasks } from '../ tasks/tasksSlice';
import TaskItem from '../ tasks/components/TaskItem';

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

  const styleColor = project?.status === 'Not started' ?
    theme.palette.primary.main : project?.status === 'Ongoing' ?
      theme.palette.success.main : '#000';

  console.log(tasks)

  return (
    <Container style={{height: '90vh'}}>
      <Grid container style={pageTopStyle} direction='row' justifyContent='space-between'>
        <Typography variant='h3'>{project?.title}</Typography>
        {project && user?._id === project?.leader._id ? (
          <>
            <IconButton
              color='error'
              onClick={() => deleteProject(project._id)}
            ><DeleteIcon/></IconButton>
            <IconButton
              color='error'
              onClick={() => navigate('/edit-project/' + project?._id)}
            ><EditIcon/></IconButton>
          </>
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
          <ListItem>Leader: {project?.leader.displayName}</ListItem>
          {project?.participants.map((item, idx) => (
            <ListItem key={idx}>{item.role}: {item.user}</ListItem>
          ))}
        </List>
          <Grid item xs>
            <Typography variant='h5'>Tasks:</Typography>
            {tasks.map((task) => (
              <TaskItem key={task._id} task={task}/>
              ))}
          </Grid>
      </Grid>
    </Container>
  );
};

export default ProjectPage;