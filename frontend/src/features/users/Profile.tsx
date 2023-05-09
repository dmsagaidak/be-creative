import React from 'react';
import { useAppSelector } from '../../app/hooks';
import { selectUser } from './usersSlice';
import { Container, Divider, Grid, Typography } from '@mui/material';
import { apiUrl } from '../../constants';
import { Navigate } from 'react-router-dom';
import noAvatar from '../../../src/assets/images/no-avatar.png'

const Profile = () => {
  const user = useAppSelector(selectUser);

  if(!user) {
    return <Navigate to={'/login'}/>
  }

  return (
    <Container>
      <Grid container xs direction='column'>
        <Typography variant="h4">{user?.displayName}</Typography>
        <Divider/>
        <Grid item container xs sx={{pt: 3}}>
          {user.avatar ?
            (<Typography
            component="img"
            src={apiUrl + '/' + user?.avatar}
            alt={user?.displayName}
            style={{width: '200px', height: '200px', borderRadius: '3px'}}
          />) :
            (<Typography
              component="img"
              src={noAvatar}
              alt={user.displayName}
              style={{width: '200px', height: '200px', borderRadius: '3px'}}
            />)}

          <Grid item sx={{ml: 2}}>
            <Typography component="p">{user?.displayName}</Typography>
            <Typography component="p">{user?.email}</Typography>
            <Typography component="p">{user?.organization}</Typography>
          </Grid>

        </Grid>
      </Grid>
    </Container>
  );
};

export default Profile;