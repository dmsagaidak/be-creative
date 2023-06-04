import React, { useEffect } from 'react';
import { Grid } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { selectUserById } from './usersSlice';
import { useNavigate, useParams } from 'react-router-dom';
import { findUserById, updateUser } from './usersThunks';
import { UpdateUserMutation } from '../../types';
import UpdateUserForm from './components/UpdateUserForm';

const EditUser = () => {
  const dispatch = useAppDispatch();
  const { id } = useParams() as { id: string };
  const user = useAppSelector(selectUserById);
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      void dispatch(findUserById(id));
    }
  }, [dispatch, id]);

  const onSubmit = async (userMutation: UpdateUserMutation) => {
    await dispatch(updateUser({ id, userMutation })).unwrap();
    navigate(`/profile/${user?._id}`);
  };

  const existingUser = user && {
    email: user.email,
    displayName: user.displayName,
    avatar: null,
    organization: user.organization,
  };

  return <Grid container>{existingUser && <UpdateUserForm onSubmit={onSubmit} existingUser={existingUser} />}</Grid>;
};

export default EditUser;
