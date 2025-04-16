import './App.css';
import React, { Suspense, lazy, useEffect } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { useSelector } from 'react-redux';

const Home = lazy(() => import('./Components/Expenses/Home'));
const CompleteProfile = lazy(() => import('./Components/Profile/CompleteProfile'));
const ForgotPassword = lazy(() => import('./Components/Authentication/ForgotPassword'));
const Login = lazy(() => import('./Components/Authentication/Login'));
const SignUp = lazy(() => import('./Components/Authentication/SignUp'));

function App() {
  const userLogged = useSelector(state => state.auth.isLoggedIn);
  const mode = useSelector(state => state.theme.mode);

  useEffect(() => {
    document.body.className = mode; 
  }, [mode]);

  return (
    <Suspense fallback={<p>Loading...</p>}>
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
    </Suspense>
  );
}

export default App;
