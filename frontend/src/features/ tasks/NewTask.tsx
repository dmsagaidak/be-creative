import React from 'react';
import { useAppDispatch } from '../../app/hooks';
import { createTask } from './tasksThunks';
import { TaskMutation } from '../../types';
import { useNavigate } from 'react-router-dom';
import TaskForm from './components/TaskForm';

const NewTask = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

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
      <TaskForm onSubmit={onFormSubmit}/>
    </>
  );
};

export default NewTask;