import './App.css'
import React from 'react';

import Home from './Components/Expenses/Home';
import { Navigate, Route, Routes } from 'react-router-dom';
import CompleteProfile from './Components/Profile/CompleteProfile';
import ForgotPassword from './Components/Authentication/ForgotPassword';
import { useSelector } from 'react-redux';
import Login from './Components/Authentication/Login';
import SignUp from './Components/Authentication/SignUp';
import { useEffect } from 'react';

function App() {
  const userLogged = useSelector(state => state.auth.isLoggedIn);
  const mode = useSelector(state => state.theme.mode);

useEffect(() => {
  document.body.className = mode; 
}, [mode]);

  return (
    <Routes>
      <Route path="/" element={<Navigate to={userLogged ? "/home" : "/login"} />} />
      
      <Route 
        path="/login" 
        element={userLogged ? <Navigate to="/home" /> : <Login />} 
      />
      
      <Route 
        path="/signUp" 
        element={userLogged ? <Navigate to="/home" /> : <SignUp />} 
      />

      <Route 
        path="/home" 
        element={userLogged ? <Home /> : <Navigate to="/login" />} 
      />

      <Route 
        path="/profile" 
        element={userLogged ? <CompleteProfile /> : <Navigate to="/login" />} 
      />

      <Route path="/forgot-password" element={<ForgotPassword />} />
    </Routes>
  );
}

export default App;
