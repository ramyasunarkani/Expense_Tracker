import { useContext } from 'react'
import './App.css'
import Authentication from './Components/Authentication/Authentication'
import AuthContext from './Store/auth-context'
import Expenses from './Components/Expenses/Expenses';
import { Navigate, Route, Routes } from 'react-router-dom';

function App() {
  const authctx=useContext(AuthContext);
  const userLogged=authctx.isLoggedIn;

  return (
    <>
    <Routes>
      <Route path='/home' element={userLogged?<Expenses/>:<Navigate to='/'/>}/>
      <Route path='/' element={<Authentication/>}/>
    </Routes>
    </>
  )
}

export default App
