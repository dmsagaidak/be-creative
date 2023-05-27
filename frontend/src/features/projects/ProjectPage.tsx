import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { selectOneProject, selectOneProjectFetching } from './projectsSlice';
import { fetchOneProject, removeProject } from './projectsThunks';
import { Alert, Container, Divider, Grid, IconButton, Link, List, ListItem, Typography } from '@mui/material';
import theme from '../../theme';
import { selectUser } from '../users/usersSlice';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { headingFS, pageSubheading, pageTopStyle } from '../../styles';
import { pageBodyStyle } from '../../styles';
import { fetchTasksByProject } from '../ tasks/tasksThunks';
import { selectTasks, selectTasksFetching } from '../ tasks/tasksSlice';
import TaskItem from '../ tasks/components/TaskItem';
import AddIcon from '@mui/icons-material/Add';
import dayjs from 'dayjs';
import CircularProgressElement from '../../components/UI/CircularProgressElement/CircularProgressElement';
import { apiUrl } from '../../constants';


const ProjectPage = () => {
  const { id } = useParams() as { id: string };
  const dispatch = useAppDispatch();
  const project = useAppSelector(selectOneProject);
  const projectFetching = useAppSelector(selectOneProjectFetching);
  const tasksFetching = useAppSelector(selectTasksFetching);
  const tasks = useAppSelector(selectTasks);
  const user = useAppSelector(selectUser);
  const navigate = useNavigate();

  useEffect(() => {
    void dispatch(fetchOneProject(id));
    void dispatch(fetchTasksByProject(id));
  }, [dispatch, id]);

  const deleteProject = async (projectId: string) => {
    if(window.confirm('Do you really want to remove this project?')) {
      const result = await dispatch(removeProject(projectId));

      if(result.meta.requestStatus === 'rejected') {
        window.alert('This project cannot be removed because it has related tasks');
      }else {
        navigate('/');
      }
    }
  };

  const styleColor = project?.status === 'Not started' ?
    theme.palette.info.main : project?.status === 'Ongoing' ?
      theme.palette.success.main : 'red';

  return (
    <Container>
      {projectFetching ?
        <CircularProgressElement/> :
        (<>
          <Grid container style={pageTopStyle} direction='row' justifyContent='space-between'>
            <Typography variant='h3' fontSize={headingFS}>{project?.title}</Typography>
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
            <Grid container direction="column" style={pageBodyStyle}>
              <Grid item xs sx={{p: 2, textAlign: 'center'}}>
                <Typography
                  component="img"
                  src={apiUrl + '/' + project?.image}
                  alt={project?.title}
                  width="50vw"
                  borderRadius="10px"
                />
              </Grid>
              <Grid item xs>
                <Typography component='p' style={pageSubheading}>Description:</Typography>
                <Typography component='p' sx={{pb: 1}}>{project?.description}</Typography>
                <Divider />
                <Typography component='p' style={pageSubheading}>Status: <Typography component='span' style={{color: styleColor}}>{project?.status}</Typography></Typography>
                <Divider />
                <List>
                  <Typography style={pageSubheading}>Project team:</Typography>
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
              </Grid>
            <Grid item xs sx={{pb: 3}}>
              <Typography component='p' style={pageSubheading}>Tasks:{' '} <IconButton component={Link} href="/tasks/new"><AddIcon/></IconButton> </Typography>
              <Grid item container direction="column" alignContent="center">
                {tasksFetching ?
                  <CircularProgressElement/> :
                  tasks.length ?
                    tasks.map((task) => (
                  <TaskItem
                    key={task._id}
                    task={task}
                  />
                )) :
                    (<Alert severity="info">
                      No tasks in this project. Please push + button to add one
                    </Alert>)}
              </Grid>
            </Grid>
          </Grid>
        </>)}

    </Container>
  );
};

export default ProjectPage;