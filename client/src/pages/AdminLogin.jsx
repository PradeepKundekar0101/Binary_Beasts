import { FaEnvelope, FaLock } from "react-icons/fa";
import React, {useState} from "react";
import { useNavigate } from "react-router-dom";
import {useDispatch} from 'react-redux';
import { setUser } from "../store/slices/auth";
const AdminLogin = () => {
  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");
  const navigate = useNavigate();
  const handleEmailChange=(e)=>{
      setEmail(e.target.value);
  }
  const handlePasswordChange=(e)=>{
    setPassword(e.target.value);
}

  const dispatch = useDispatch()
  function auth(){
    if(email=='admin' && password=='admin')
    {
      localStorage.setItem("admin","true")
      dispatch(setUser({firstname:"pradeep"}));
      alert("Login Successfull");
      navigate("/users");

    }
    else{
      alert("Login Failed");
    }
 }
  return (
    <div className="h-screen w-screen flex bg-slate-100 items-center justify-center">
      <div className="login-container flex flex-col h-[40rem] w-[90vw] bg-white rounded-lg shadow-xl md:flex-row md:w-50vw">
        <div className="left rounded-tl-xl rounded-tr-xl bg-cover bg-center h-[15rem] w-[90vw] md:h-[40rem] md:w-[45vw] "></div>
        <div className="right flex flex-col items-center justify-center md:h-[40rem] md:w-[45vw]">
          <h1 className="text-center text-5xl font-bold py-5">Admin Login </h1>
          <form action="" onSubmit={auth} className="flex flex-col items-center space-y-6">
      
            <div className="input-container border-b-2  flex items-center">
              <FaEnvelope className="h-6 w-6 " />
              <input
                
                type="text"
                onChange={handleEmailChange}
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
                onChange={handlePasswordChange}
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
        
         
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
