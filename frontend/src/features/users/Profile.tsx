import React from 'react';
import { useAppSelector } from '../../app/hooks';
import { selectUser } from './usersSlice';

const Profile = () => {
  const user = useAppSelector(selectUser);
  console.log(user)
  return (
    <div>
      {user?.displayName}
    </div>
  );
};

export default Profile;