import { useState,useEffect } from 'react'
import {Navigate, Route,Routes} from 'react-router-dom'

import Login from './pages/Login'
import Register from './pages/Register'
import UserDashboard from './pages/UserDashboard'
import AddProduct from './pages/AddProduct'
import Products from './pages/Products'
import UpdateItem from './pages/UpdateItem'
import { useSelector } from 'react-redux'
function App() {
  const user = useSelector((state)=>{return state.user});
  return (
    <> 
      <Routes>
        <Route path='/login' element={!user?<Login/>:<Navigate to="/"/>}></Route>
        <Route path='/register' element={!user?<Register/>:<Navigate to="/"/>}></Route>
        <Route path='/dashboard' element={<UserDashboard/>}></Route>
        <Route path='/addItem' element={<AddProduct/>}></Route>
        <Route path='/items' element={<Products/>}></Route>
        <Route path="/update/:id" element={<UpdateItem/>}></Route>

      </Routes>
    </>
  )
}

export default App
