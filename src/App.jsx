import { useContext } from 'react'
import './App.css'
import Home from './Components/Expenses/Home';
import { Navigate, Route, Routes } from 'react-router-dom';
import CompleteProfile from './Components/Profile/CompleteProfile';
import ForgotPassword from './Components/Authentication/ForgotPassword';
import { useSelector } from 'react-redux';
import Login from './Components/Authentication/Login';
import SignUp from './Components/Authentication/SignUp';

function App() {
  const userLogged=useSelector(state=>state.auth.isLoggedIn)
  return (
    <>
    <Routes>
    <Route path="/" element={<Navigate to="/login" />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signUp" element={<SignUp />} />
      <Route path='/' element={userLogged ? <Navigate to="/home" /> : <Login />} />
      <Route path='/home' element={userLogged?<Home/>:<Navigate to='/'/>}/>
      <Route path='/complete-profile' element={userLogged ? <CompleteProfile /> : <Navigate to='/' />} />
      <Route path='/forgot-password' element={<ForgotPassword />} />

   
    </Routes>
    </>
  )
}

export default App
