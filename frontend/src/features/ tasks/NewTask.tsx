import React from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { createTask } from './tasksThunks';
import { TaskMutation } from '../../types';
import { useNavigate } from 'react-router-dom';
import TaskForm from './components/TaskForm';
import { selectTaskCreating, selectTaskCreatingError } from './tasksSlice';

const NewTask = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const createLoading = useAppSelector(selectTaskCreating);
  const error = useAppSelector(selectTaskCreatingError);

  const onFormSubmit = async (taskMutation: TaskMutation) => {
    try {
      await dispatch(createTask(taskMutation)).unwrap();
      navigate('/projects/' + taskMutation.project);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <>
      <TaskForm onSubmit={onFormSubmit} error={error} loading={createLoading} />
    </>
  );
};

export default NewTask;
