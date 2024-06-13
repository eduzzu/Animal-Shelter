import { useSelector } from 'react-redux'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './scenes/login/Login.jsx';
import { CssBaseline } from '@mui/material';
import HomePage from './scenes/homePage/HomePage.jsx';
import React from 'react';

function App() {

  const isAuth = Boolean(useSelector((state) => state.auth.token));

  return (
    <div className='app'>
      <BrowserRouter>
        <CssBaseline />
          <Routes>
            <Route path='/'element={<Login />} />
            <Route path="/home" element={isAuth ? <HomePage /> : <Navigate to="/" />} />
          </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
