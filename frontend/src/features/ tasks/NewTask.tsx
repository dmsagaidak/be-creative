import React from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { createTask } from './tasksThunks';
import { TaskMutation } from '../../types';
import { useNavigate } from 'react-router-dom';
import TaskForm from './components/TaskForm';
import { selectTaskCreating } from './tasksSlice';

const NewTask = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const createLoading = useAppSelector(selectTaskCreating);
  const onFormSubmit = async (taskMutation: TaskMutation) => {
    try{
      await dispatch(createTask(taskMutation)).unwrap();
      navigate('/');
    }catch (e) {
      console.log(e);
    }
  };

  return (
    <>
      <TaskForm
        onSubmit={onFormSubmit}
        loading={createLoading}
      />
    </>
  );
};

export default NewTask;