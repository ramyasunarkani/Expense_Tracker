import { useContext } from 'react'
import './App.css'
import Authentication from './Components/Authentication/Authentication'
import AuthContext from './Store/auth-context'
import Home from './Components/Expenses/Home';
import { Navigate, Route, Routes } from 'react-router-dom';
import CompleteProfile from './Components/Profile/CompleteProfile';
import ForgotPassword from './Components/Authentication/ForgotPassword';

function App() {
  const authctx=useContext(AuthContext);
  const userLogged=authctx.isLoggedIn;
  return (
    <>
    <Routes>
      <Route path='/' element={userLogged ? <Navigate to="/home" /> : <Authentication />} />
      <Route path='/home' element={userLogged?<Home/>:<Navigate to='/'/>}/>
      <Route path='/complete-profile' element={userLogged ? <CompleteProfile /> : <Navigate to='/' />} />
        <Route path='/forgot-password' element={<ForgotPassword />} />

   
    </Routes>
    </>
  )
}

export default App
