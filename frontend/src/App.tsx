import React from 'react';
import { CssBaseline } from '@mui/material';
import { Route, Routes } from 'react-router-dom';
import Register from './features/users/Register';
import Login from './features/users/Login';
import Test from './Test';
import AppToolbar from './components/UI/AppToolbar/AppToolbar';


function App() {
  return (
    <>
      <CssBaseline/>
      <header>
        <AppToolbar/>
      </header>
      <main>
        <Routes>
          <Route path='/' element={<Test/>}/>
          <Route path='/register' element={<Register/>}/>
          <Route path='/login' element={<Login/>}/>
          <Route path="*" element={<h1>Not found!</h1>} />
        </Routes>
      </main>
    </>
  );
}

export default App;
