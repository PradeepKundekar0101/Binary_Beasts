import { useState,useEffect } from 'react'
import {Navigate, Route,Routes} from 'react-router-dom'

import Login from './pages/Login'
import Register from './pages/Register'
import UserDashboard from './pages/UserDashboard'
import { useSelector } from 'react-redux'
function App() {
  const user = useSelector((state)=>{return state.user});
  return (
    <> 
      <Routes>
        <Route path='/login' element={!user?<Login/>:<Navigate to="/"/>}></Route>
        <Route path='/register' element={!user?<Register/>:<Navigate to="/"/>}></Route>
        <Route path='/dashboard' element={<UserDashboard/>}></Route>
      </Routes>
    </>
  )
}

export default App
