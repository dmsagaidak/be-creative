import React from 'react';
import { CssBaseline } from '@mui/material';
import { Route, Routes } from 'react-router-dom';
import Register from './features/users/Register';
import Login from './features/users/Login';
import Home from './Home';
import AppToolbar from './components/UI/AppToolbar/AppToolbar';
import NewProject from './features/projects/NewProject';


function App() {
  return (
    <>
      <CssBaseline/>
      <header>
        <AppToolbar/>
      </header>
      <main>
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/register' element={<Register/>}/>
          <Route path='/login' element={<Login/>}/>
          <Route path='/projects/new' element={<NewProject/>}/>
          <Route path="*" element={<h1>Not found!</h1>} />
        </Routes>
      </main>
    </>
  );
}

export default App;
