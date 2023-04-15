import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { selectOneProject } from './projectsSlice';
import { fetchOneProject, removeProject } from './projectsThunks';
import { Container, Grid, IconButton, Typography } from '@mui/material';
import theme from '../../theme';
import { selectUser } from '../users/usersSlice';
import DeleteIcon from '@mui/icons-material/Delete';

const pageTopStyle = {
  backgroundColor: theme.palette.primary.light,
  color: '#fff',
  borderTopRightRadius: '7px',
  borderTopLeftRadius: '7px',
  paddingLeft: '7px',
  paddingRight: '7px',
};

const pageBodyStyle = {
  paddingTop: '8px',
  border: '1px solid',
  borderColor: theme.palette.primary.light,
  borderBottomRightRadius: '7px',
  borderBottomLeftRadius: '7px',
  paddingLeft: '7px',
  paddingRight: '7px',
};

const ProjectPage = () => {
  const { id } = useParams() as { id: string };
  const dispatch = useAppDispatch();
  const project = useAppSelector(selectOneProject);
  const user = useAppSelector(selectUser);
  const navigate = useNavigate();

  useEffect(() => {
    void dispatch(fetchOneProject(id));
  }, [dispatch, id]);

  const deleteProject = async (projectId: string) => {
    if(window.confirm('Do you really want to remove this project?')) {
      await dispatch(removeProject(projectId));
      navigate('/');
    }
  };

  return (
    <Container style={{height: '90vh'}}>
      <Grid item xs style={pageTopStyle}>
        <Typography variant='h3'>{project?.title}</Typography>
      </Grid>
      <Grid item style={pageBodyStyle}>
        <Typography component='p' style={{fontWeight: 700}}>Description:</Typography>
        <Typography component='p'>{project?.description}</Typography>
        {project && user?._id === project?.leader._id ? (<Grid item>
          <IconButton
            color='error'
            onClick={() => deleteProject(project._id)}
          ><DeleteIcon/></IconButton>
        </Grid>) : (<> <Typography></Typography></>)}
      </Grid>
    </Container>
  );
};

export default ProjectPage;