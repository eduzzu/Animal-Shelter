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
import AdminHomePage from './scenes/admin/adminHomePage/AdminHomePage.jsx';
import SeeAllPets from './scenes/admin/pets/SeeAllPets.jsx';
import SeeAllRequests from './scenes/admin/requests/SeeAllRequests.jsx';
import SeeAllUsers from './scenes/admin/users/SeeAllUsers.jsx';
import RequestPage from "./scenes/requests/RequestPage.jsx";
import AddPet from './scenes/admin/pets/AddPet.jsx';
import SendRequest from './scenes/requests/sendRequest/SendRequest.jsx';
import EditPetPage from './scenes/admin/pets/EditPetPage.jsx';

function App() {

  const isAuth = Boolean(useSelector((state) => state.auth.token));
  const isAdmin = Boolean(useSelector((state) => state.auth.isAdmin));

  return (
    <div className='app'>
      <BrowserRouter>
        <CssBaseline />
        <Routes>
          <Route path='/' element={<Login />} />
          <Route path="/home" element={isAuth ? <HomePage /> : <Navigate to="/" />} />
          <Route path='/pets' element={isAuth && isAdmin ?  <SeeAllPets /> : <Navigate to="/home" />} />
          <Route path='/pets/dogs' element={isAuth ? <Dogs /> : <Navigate to="/" />} />
          <Route path='/pets/cats' element={isAuth ? <Cats /> : <Navigate to="/" />} />
          <Route path='/pets/hamsters' element={isAuth ? <Hamsters /> : <Navigate to="/" />} />
          <Route path='/pets/parrots' element={isAuth ? <Parrots /> : <Navigate to="/" />} />
          <Route path='/pets/newPet' element={isAuth && isAdmin ? <AddPet /> : <Navigate to={"/home"} />} />
          <Route path="/pets/:id" element={isAuth ? <PetPage /> : <Navigate to="/" />} />
          <Route path="/pets/:id/editPet" element={isAuth && isAdmin ? <EditPetPage /> : <Navigate to="/home" />} />
          <Route path="/pets/:petId/adopt" element={isAuth ? <SendRequest /> : <Navigate to="/" />} />
          <Route path="/users" element={isAuth && isAdmin ? <SeeAllUsers /> : <Navigate to="/home" />} />
          <Route path="/users/:id" element={isAuth ? <ProfilePage /> : <Navigate to="/" />} />
          <Route path='/users/:id/edit' element={isAuth ? <EditUserProfile /> : <Navigate to={"/"} />} />
          <Route path='/requests' element={isAuth && isAdmin ? <SeeAllRequests /> : <Navigate to={"/home"} />} />
          <Route path='/requests/:id' element={isAuth ? <SeeUserAdoptions /> : <Navigate to={"/"} />} />
          <Route path='/requests/:id/adoption' element={isAuth ? <RequestPage /> : <Navigate to={"/"} />} />
          <Route path='/home/admin' element={isAuth && isAdmin ? <AdminHomePage /> : <Navigate to={"/home"} />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
