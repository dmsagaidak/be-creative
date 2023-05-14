import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { selectUser, selectUserById } from './usersSlice';
import { Container, Divider, Grid, IconButton, Typography } from '@mui/material';
import { apiUrl } from '../../constants';
import { useNavigate, useParams } from 'react-router-dom';
import noAvatar from '../../../src/assets/images/no-avatar.png'
import { findUserById } from './usersThunks';
import EditIcon from '@mui/icons-material/Edit';
import PasswordIcon from '@mui/icons-material/Password';

const Profile = () => {
  const { id } = useParams() as { id: string };
  const dispatch = useAppDispatch();
  const profileUser = useAppSelector(selectUserById);
  const user = useAppSelector(selectUser);
  const navigate = useNavigate();

  useEffect(() => {
    void dispatch(findUserById(id));
  }, [dispatch, id]);

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
        <Grid item container xs sx={{pt: 3}}>
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
            <Typography component="p">Email: {profileUser?.email}</Typography>
            <Typography component="p">Works at {profileUser?.organization}</Typography>
          </Grid>

        </Grid>
      </Grid>
    </Container>
  );
};

export default Profile;