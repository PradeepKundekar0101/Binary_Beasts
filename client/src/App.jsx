import { useState,useEffect } from 'react'
import {Navigate, Route,Routes} from 'react-router-dom'

import Login from './pages/Login'
import Register from './pages/Register'

import AddProduct from './pages/AddProduct'
import Products from './pages/Products'
import UpdateItem from './pages/UpdateItem'
import PCharts from './pages/PCharts'
import ManageProducts from './pages/ManageProducts'
import { useSelector } from 'react-redux'
import OrderItem from './pages/OrderItem'
import ManageOrders from './pages/ManageOrders'

import ApplicationForm from './pages/ApplicationForm'
import Users from './pages/Users'

import AdminLogin from './pages/AdminLogin'
import Home from './pages/Home'
import Profile from './pages/Profile'

function App() {
  const user = useSelector((state)=>{return state.user});
  return (
    <> 
      <Routes>
      <Route path='/' element={user?user.firstname!=""?<Home/>:<ApplicationForm/>:<Navigate to="/login"/>}></Route>
        <Route path='/login' element={!user?<Login/>:<Navigate to="/"/>}></Route>
        <Route path='/register' element={!user?<Register/>:<Navigate to="/"/>}></Route>


        
        <Route path='/addItem' element={user?user.firstname!=""?<AddProduct/>:<ApplicationForm/>:<Navigate to="/login"/>}></Route>
        <Route path='/items' element={user?user.firstname!=""?<Products/>:<ApplicationForm/>:<Navigate to="/login"/>}></Route>
        <Route path='/charts' element={user?user.firstname!=""?<PCharts/>:<ApplicationForm/>:<Navigate to="/login"/>}></Route>
        <Route path="/update/:id" element={user?user.firstname!=""?<UpdateItem/>:<ApplicationForm/>:<Navigate to="/login"/>}></Route>
        <Route path='/manageitems' element={user?user.firstname!=""?<ManageProducts/>:<ApplicationForm/>:<Navigate to="/login"/>}/>

        <Route path="/order/:id" element={user?user.firstname!=""?<OrderItem/>:<ApplicationForm/>:<Navigate to="/login"/>}></Route>
        <Route path="/manageorders" element={user?user.firstname!=""?<ManageOrders/>:<ApplicationForm/>:<Navigate to="/login"/>}></Route>

          <Route path='/applicationform' element={user?<ApplicationForm/>:<Navigate to="/login"/>}></Route>
          <Route path='/users' element={user?user.firstname!=""?<Users/>:<ApplicationForm/>:<Navigate to="/login"/>} />

        <Route path='login/admin' element={<AdminLogin/>}/>

        <Route path='/:id' element={<Profile/>}/>

      </Routes>
    </>
  )
}

export default App
