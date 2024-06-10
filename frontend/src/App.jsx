import { useSelector } from 'react-redux'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './scenes/login/Login.jsx';
import { CssBaseline } from '@mui/material';

function App() {

  const isAuth = Boolean(useSelector((state) => state.token));

  return (
    <div className='app'>
      <BrowserRouter>
        <CssBaseline />
          <Routes>
            <Route path='/'element={<Login />}/>
          </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
