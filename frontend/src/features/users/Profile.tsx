import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { selectUser, selectUserById } from './usersSlice';
import { Alert, Container, Divider, Grid, IconButton, Typography } from '@mui/material';
import { apiUrl } from '../../constants';
import { useNavigate, useParams } from 'react-router-dom';
import noAvatar from '../../../src/assets/images/no-avatar.png';
import { findUserById } from './usersThunks';
import EditIcon from '@mui/icons-material/Edit';
import PasswordIcon from '@mui/icons-material/Password';
import { fetchTasksByUser } from '../tasks/tasksThunks';
import { selectTasks } from '../tasks/tasksSlice';
import { fetchProjectByParticipant, fetchProjectsByUser } from '../projects/projectsThunks';
import { selectProjects, selectProjectsByParticipant } from '../projects/projectsSlice';
import AddIcon from '@mui/icons-material/Add';
import ProjectCard from '../projects/components/ProjectCard';
import TaskCardMini from '../tasks/components/TaskCardMini';

const Profile = () => {
  const { id } = useParams() as { id: string };
  const dispatch = useAppDispatch();
  const profileUser = useAppSelector(selectUserById);
  const user = useAppSelector(selectUser);
  const tasks = useAppSelector(selectTasks);
  const projects = useAppSelector(selectProjects);
  const projectsByParticipant = useAppSelector(selectProjectsByParticipant);
  const navigate = useNavigate();

  useEffect(() => {
    void dispatch(findUserById(id));
    void dispatch(fetchProjectsByUser(id));
    void dispatch(fetchProjectByParticipant(id));
    void dispatch(fetchTasksByUser(id));
  }, [dispatch, id]);

  let userImg;

  if (profileUser?.avatar && user?.googleId) {
    const avatarUrl = profileUser.avatar.slice(8);
    userImg = apiUrl + '/' + avatarUrl;
  } else {
    userImg = apiUrl + '/' + profileUser?.avatar;
  }

  return (
    <Container>
      <Grid container direction="column">
        <Grid item container>
          <Typography variant="h4" fontSize={{ xs: '1.8rem', sm: '2rem' }}>
            {profileUser?.displayName}
          </Typography>
          {user?._id === profileUser?._id && (
            <>
              <IconButton onClick={() => navigate(`/edit-user/${profileUser?._id}`)}>
                <EditIcon />
              </IconButton>
              <IconButton onClick={() => navigate(`/profile/${profileUser?._id}/change-password`)}>
                <PasswordIcon />
              </IconButton>
            </>
          )}
        </Grid>
        <Divider />
        <Grid item container sx={{ pt: 3, pb: 3 }}>
          <Grid item xs={12} sm={4} md={3} textAlign="center">
            {profileUser?.avatar ? (
              <Typography
                component="img"
                src={userImg}
                alt={profileUser?.displayName}
                style={{ width: '200px', height: '200px', borderRadius: '3px' }}
              />
            ) : (
              <Typography
                component="img"
                src={noAvatar}
                alt={profileUser?.displayName}
                style={{ width: '150px', height: '150px', borderRadius: '5px' }}
              />
            )}
          </Grid>
          <Grid item sx={{ ml: 2 }} xs={12} sm={6} md={8} textAlign={{ xs: 'center', sm: 'left' }}>
            <Typography component="p" sx={{ ml: 2 }} fontSize={{ xs: '18px', sm: '20px', md: '25px' }}>
              Email: {profileUser?.email}
            </Typography>
            <Typography component="p" sx={{ ml: 2 }} fontSize={{ xs: '18px', sm: '20px', md: '25px' }}>
              Works at {profileUser?.organization}
            </Typography>
          </Grid>
        </Grid>
        <Grid item container direction="column">
          <Typography variant="h6">
            {profileUser?.displayName}&apos;s Projects
            {user?._id === profileUser?._id ? (
              <IconButton onClick={() => navigate('/projects/new')}>
                <AddIcon />
              </IconButton>
            ) : (
              <Typography></Typography>
            )}
          </Typography>
          {projects.length ? (
            projects.map((project) => <ProjectCard key={project._id} project={project} />)
          ) : (
            <Alert severity="info">{profileUser?.displayName} hasn&apos;t created any project</Alert>
          )}
        </Grid>
        <Grid item container direction="column" sx={{ mt: 3 }}>
          <Typography variant="h6">Projects {profileUser?.displayName} participates in</Typography>
          {projectsByParticipant.length ? (
            projectsByParticipant.map((project) => <ProjectCard key={project._id} project={project} />)
          ) : (
            <Alert severity="info">{profileUser?.displayName} isn&apos;t involved in any project</Alert>
          )}
        </Grid>
        <Grid item container direction="column" sx={{ mt: 3 }}>
          <Typography variant="h6">{profileUser?.displayName}&apos;s tasks</Typography>
          {tasks.length ? (
            tasks.map((task) => <TaskCardMini key={task._id} task={task} />)
          ) : (
            <Alert severity="info">{profileUser?.displayName} has no tasks assigned</Alert>
          )}
        </Grid>
      </Grid>
    </Container>
  );
};

export default Profile;
