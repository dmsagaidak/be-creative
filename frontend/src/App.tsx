import React from 'react';
import { CssBaseline } from '@mui/material';
import { Route, Routes } from 'react-router-dom';
import Register from './features/users/Register';
import Login from './features/users/Login';
import Home from './Home';
import AppToolbar from './components/UI/AppToolbar/AppToolbar';
import NewProject from './features/projects/NewProject';
import Profile from './features/users/Profile';
import Footer from './components/Footer/Footer';
import ProjectPage from './features/projects/ProjectPage';
import EditProject from './features/projects/EditProject';
import TaskPage from './features/tasks/TaskPage';
import NewTask from './features/tasks/NewTask';
import EditTask from './features/tasks/EditTask';
import Chat from './features/chat/Chat';
import Calendar from './features/events/Calendar';
import EditUser from './features/users/EditUser';
import ChangePassword from './features/users/ChangePassword';
import MyProjects from './features/users/MyProjects';
import MyTasks from './features/users/MyTasks';
import NewEvent from './features/events/NewEvent';
import UpdateEvent from './features/events/UpdateEvent';
import InvolvedProjects from './features/users/InvolvedProjects';

function App() {
  return (
    <>
      <CssBaseline />
      <header>
        <AppToolbar />
      </header>
      <main style={{ display: 'flex', minHeight: '100vh', flexDirection: 'column' }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/profile/:id" element={<Profile />} />
          <Route path="/profile/:id/change-password" element={<ChangePassword />} />
          <Route path="/edit-user/:id" element={<EditUser />} />
          <Route path="/projects/new" element={<NewProject />} />
          <Route path="/projects/:id" element={<ProjectPage />} />
          <Route path="/edit-project/:id" element={<EditProject />} />
          <Route path="/tasks/:id" element={<TaskPage />} />
          <Route path="/tasks/new" element={<NewTask />} />
          <Route path="/edit-task/:id" element={<EditTask />} />
          <Route path="/chat" element={<Chat />} />
          <Route path="/user/:id/projects" element={<MyProjects />} />
          <Route path="/user/:id/tasks" element={<MyTasks />} />
          <Route path="/user/:id/involved" element={<InvolvedProjects />} />
          <Route path="/calendar" element={<Calendar />} />
          <Route path="/events/new" element={<NewEvent />} />
          <Route path="/edit-event/:id" element={<UpdateEvent />} />
          <Route path="*" element={<h1>Not found!</h1>} />
        </Routes>
      </main>
      <footer>
        <Footer />
      </footer>
    </>
  );
}

export default App;
