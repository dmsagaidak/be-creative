import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { selectUser, selectUserById } from './usersSlice';
import { Alert, Card, Container, Divider, Grid, IconButton, Typography } from '@mui/material';
import { apiUrl } from '../../constants';
import { useNavigate, useParams } from 'react-router-dom';
import noAvatar from '../../../src/assets/images/no-avatar.png'
import { findUserById } from './usersThunks';
import EditIcon from '@mui/icons-material/Edit';
import PasswordIcon from '@mui/icons-material/Password';
import { fetchTasksByUser } from '../ tasks/tasksThunks';
import { selectTasks } from '../ tasks/tasksSlice';
import { fetchProjectsByUser } from '../projects/projectsThunks';
import { selectProjects } from '../projects/projectsSlice';
import { profileItemCard } from '../../styles';

const Profile = () => {
  const { id } = useParams() as { id: string };
  const dispatch = useAppDispatch();
  const profileUser = useAppSelector(selectUserById);
  const user = useAppSelector(selectUser);
  const tasks = useAppSelector(selectTasks);
  const projects = useAppSelector(selectProjects);
  const navigate = useNavigate();

  useEffect(() => {
    void dispatch(findUserById(id));
      void dispatch(fetchProjectsByUser(id));
    void dispatch(fetchTasksByUser(id));
  }, [dispatch, id]);

  console.log(tasks)

  return (
    <Container>
      <Grid container direction='column'>
        <Grid item container>
          <Typography variant="h4">{profileUser?.displayName}</Typography>
          {user?._id === profileUser?._id &&
            (<>
                <IconButton onClick={() => navigate(`/edit-user/${profileUser?._id}`)}>
                  <EditIcon/>
                </IconButton>
                <IconButton onClick={() => navigate(`/profile/${profileUser?._id}/change-password`)}>
                  <PasswordIcon/>
                </IconButton>
            </>)}
        </Grid>
        <Divider/>
        <Grid item container sx={{pt: 3, pb: 3}}>
          {profileUser?.avatar ?
            (<Typography
            component="img"
            src={apiUrl + '/' + profileUser?.avatar}
            alt={profileUser?.displayName}
            style={{width: '200px', height: '200px', borderRadius: '3px'}}
          />) :
            (<Typography
              component="img"
              src={noAvatar}
              alt={profileUser?.displayName}
              style={{width: '150px', height: '150px', borderRadius: '5px'}}
            />)}

          <Grid item sx={{ml: 2}}>
            <Typography component="p" fontSize="25px">Email: {profileUser?.email}</Typography>
            <Typography component="p" fontSize="25px">Works at {profileUser?.organization}</Typography>
          </Grid>
        </Grid>
        <Grid item container direction="column">
          <Typography variant="h6">{profileUser?.displayName}'s Projects</Typography>
          {projects.length ? projects.map((project) => (
            <Card
              key={project._id}
              onClick={() => navigate(`/projects/${project._id}`)}
              style={profileItemCard}
            >
              <Typography component="p" fontWeight={700}>{project.title}</Typography>
              <Typography>{project.status}</Typography>
            </Card>
          )) :
            (<Alert severity="info">{profileUser?.displayName} hasn't created any project</Alert>)}
        </Grid>
        <Grid item container direction="column" sx={{mt: 3}}>
          <Typography variant="h6">{profileUser?.displayName}'s tasks</Typography>
          {tasks.length ? tasks.map((task) => (
            <Card
              key={task._id}
              onClick={() => navigate(`/tasks/${task._id}`)}
              style={profileItemCard}
            >
              <Typography component="p" fontWeight={700}>{task.title}</Typography>
              <Typography component="p">Project: {task.project.title}</Typography>
              <Typography component="p">Status: {task.status}</Typography>
            </Card>
          )) : (<Alert severity="info">{profileUser?.displayName} has no tasks assigned</Alert>)}
        </Grid>
      </Grid>
    </Container>
  );
};

export default Profile;