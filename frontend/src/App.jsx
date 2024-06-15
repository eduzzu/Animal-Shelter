import { useSelector } from 'react-redux'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './scenes/login/Login.jsx';
import { CssBaseline } from '@mui/material';
import HomePage from './scenes/homePage/HomePage.jsx';
import React from 'react';
import PetPage from './scenes/petPage/PetPage.jsx';

function App() {

  const isAuth = Boolean(useSelector((state) => state.auth.token));

  return (
    <div className='app'>
      <BrowserRouter>
        <CssBaseline />
          <Routes>
            <Route path='/'element={<Login />} />
            <Route path="/home" element={isAuth ? <HomePage /> : <Navigate to="/" />} />
            <Route path="/pets/:id" element={isAuth ? <PetPage /> : <Navigate to="/" />} />
          </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
