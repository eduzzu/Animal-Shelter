import { useSelector } from 'react-redux'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './scenes/login/Login.jsx';
import { CssBaseline } from '@mui/material';
import HomePage from './scenes/homePage/HomePage.jsx';
import React from 'react';
import PetPage from './scenes/petPage/PetPage.jsx';
import Dogs from './scenes/petPages/Dogs.jsx';
import Cats from './scenes/petPages/Cats.jsx';
import Hamsters from './scenes/petPages/Hamsters.jsx';
import Parrots from './scenes/petPages/Parrots.jsx';
import ProfilePage from './scenes/profilePage/ProfilePage.jsx';
import EditUserProfile from './scenes/profilePage/EditUserProfile.jsx';
import SeeUserAdoptions from './scenes/profilePage/SeeUserAdoptions.jsx';

function App() {

  const isAuth = Boolean(useSelector((state) => state.auth.token));

  return (
    <div className='app'>
      <BrowserRouter>
        <CssBaseline />
        <Routes>
          <Route path='/' element={<Login />} />
          <Route path="/home" element={isAuth ? <HomePage /> : <Navigate to="/" />} />
          <Route path='/pets/dogs' element={isAuth ? <Dogs /> : <Navigate to="/" />} />
          <Route path='/pets/cats' element={isAuth ? <Cats /> : <Navigate to="/" />} />
          <Route path='/pets/hamsters' element={isAuth ? <Hamsters /> : <Navigate to="/" />} />
          <Route path='/pets/parrots' element={isAuth ? <Parrots /> : <Navigate to="/" />} />
          <Route path="/pets/:id" element={isAuth ? <PetPage /> : <Navigate to="/" />} />
          <Route path="/users/:id" element={isAuth ? <ProfilePage /> : <Navigate to="/" />} />
          <Route path='/users/:id/edit' element={isAuth ? <EditUserProfile /> : <Navigate to={"/"} />} />
          <Route path='/adoptions/:id' element={isAuth ? <SeeUserAdoptions /> : <Navigate to={"/"} />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
