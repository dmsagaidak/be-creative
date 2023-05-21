import React, { useEffect } from 'react';
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { selectOneTask, selectOneTaskFetching, selectTaskUpdating, selectTaskUpdatingError } from './tasksSlice';
import { selectUser } from '../users/usersSlice';
import { fetchOneTask, updateTask } from './tasksThunks';
import { TaskMutation } from '../../types';
import TaskForm from './components/TaskForm';

const EditTask = () => {
  const { id } = useParams() as { id: string };
  const dispatch = useAppDispatch();
  const task = useAppSelector(selectOneTask);
  const user = useAppSelector(selectUser);
  const updateLoading = useAppSelector(selectTaskUpdating);
  const fetchLoading = useAppSelector(selectOneTaskFetching)
  const error = useAppSelector(selectTaskUpdatingError);
  const navigate = useNavigate();

  useEffect(() => {
    if(id) {
      void dispatch(fetchOneTask(id));
    }
  }, [dispatch, id]);

  const onSubmit = async (task: TaskMutation) => {
    try{
      await dispatch(updateTask({id, task})).unwrap();
      navigate(`/projects/${task.project}`)
    }catch (e) {
      console.log(e);
    }
  };

  const existingTask = task && {
    project: task.project._id,
    title: task.title,
    description: task.description,
    status: task.status,
    user: task.user._id,
    link: task.link,
    pdfFile: null,
    deadline: task.deadline,
  };

if(!user){
  return <Navigate to={'/login'}/>
}

  return (
    <>
      {existingTask && (
        <TaskForm
          onSubmit={onSubmit}
          loading={updateLoading}
          fetchTaskLoading={fetchLoading}
          existingTask={existingTask}
          error={error}
          isEdit
        />
      )}
    </>
  );
};

export default EditTask;