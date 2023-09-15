import { FaEnvelope, FaLock } from "react-icons/fa";
import React, {useState} from "react";
import {useDispatch} from 'react-redux';
import {Link,useNavigate} from "react-router-dom"
import {auth,provider} from "../firebase";
import {signInWithPopup} from "firebase/auth";
import axios from 'axios'
import {setUser,setToken} from '../store/slices/auth'
const Login = () => {
  const dispatch = useDispatch()
  function googleAuth(){
    signInWithPopup(auth,provider).then( async (data2)=>{
      const {email} = data2.user;
    try {
      const {data} = await axios.post("http://localhost:8080/user/signin",{email,google:true});
      if(data.success)
      {
          dispatch(setUser(data.data));
          dispatch(setToken(data.token));
          alert("Login sucessfull");
      }
    } catch (error) {
       alert(error.response.data.message)
    }
  })
 }
  return (
    <div className="h-screen w-screen flex bg-slate-100 items-center justify-center">
      <div className="login-container flex flex-col h-[40rem] w-[90vw] bg-white rounded-lg shadow-xl md:flex-row md:w-50vw">
        <div className="left rounded-tl-xl rounded-tr-xl bg-cover bg-center h-[15rem] w-[90vw] md:h-[40rem] md:w-[45vw] "></div>
        <div className="right flex flex-col items-center justify-center md:h-[40rem] md:w-[45vw]">
          <h1 className="text-center text-5xl font-bold py-5">Welcome Back </h1>
          <form action="" className="flex flex-col items-center space-y-6">
         

            <div className="input-container border-b-2  flex items-center">
              <FaEnvelope className="h-6 w-6 " />
              <input
                type="text"
                className="ml-4  focus:outline-none  w-[60vw] py-1
                  mx-auto
                  md:w-[30vw]
                  "
                placeholder="Email"
              />
            </div>

            <div className="input-container border-b-2  flex items-center">
              <FaLock className="h-6 w-6 " />
              <input
                type="text"
                className="ml-4  focus:outline-none  w-[60vw] py-1
                  mx-auto
                  md:w-[30vw]
                  "
                placeholder="Password"
              />
            </div>

            <div className="input-container   flex items-center">
              <input
                type="submit"
                className="focus:outline-none w-[60vw] rounded-md font-bold text-lg text-white bg-blue-500 py-2
                  mx-auto
                  md:w-[30vw]
                  "
                value="Login"
              />
            </div>
          </form>
          <center className="my-2">OR</center>
          <button  className="block md:w-[30vw] mx-auto text-lg bg-slate-200 py-2 w-[60vw]  rounded-lg" onClick={()=>{googleAuth()}} >
            <div className="flex items-center justify-center">
              <img
                src="https://www.pngmart.com/files/23/Google-Logo-PNG-HD-1.png"
                className="h-4 w-4 mx-2"
                alt="logo"
                
              />{" "}
              SignIn with Google
            </div>
          </button>
          <div className="flex justify-center">
            <Link
              className="text-center cursor-pointer text-blue-700 my-2"
              to="/register"
            >
              Create an account
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
