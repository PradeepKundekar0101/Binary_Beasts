import React,{useState,useEffect} from 'react'
import Navbar from '../components/NavBar';
import {useParams,Link} from 'react-router-dom'
import axios from 'axios';
import {useSelector} from 'react-redux';
import {format} from 'timeago.js'
const Profile = () => {
    const userStored = useSelector((state)=>{return state.user});

    const {id} = useParams();
    const [user,setUser] = useState(null);
    
  const fetchUser = async()=>{
    try {
      const {data} = await axios.get(`http://localhost:8080/user/${id}`);
      if(data.success){
        setUser(data.data);
      }
      else{
         <Navigate to={"/usernotfound"}/>
      }
      
      
    } catch (error) {
      console.log(error.message)
    }
  }
  
  useEffect(() => {
    fetchUser();
  }, [id])

  return (
    <>
   <Navbar/>

    <div className='profilePage h-[100vh] w-[100vw]'>
      <div className="profileBox">
            <div className="cover">
                <div className="top h-[30vh] md:px-20 relative flex items-center justify-center flex-col bg-blue-700 w-[100vw] md:flex-row md:justify-between">
                    <div className="details ">
                        <h1 className='text-white font-bold text-3xl  text-left w-full md:text-5xl'>{user && user.firstname}</h1>
                        <p className='md:text-lg text-center  text-slate-400'>{user &&user.email}</p>
                    </div>
                    <img className='h-[8rem] w-[8rem] md:h-[10rem] md:w-[10rem] rounded-full absolute top-40'  src={user && user.profilePicture} alt="" />
                </div>
            </div>

            <div className="number mt-24 text-center items-center font-semibold text-lg flex justify-center w-[100vw] space-x-5 md:text-left md:justify-start md:px-20 md:mt-32">
               
              
            </div>
            <div className="bio">
                <p className='text-center text-[4rem] px-10 py-4 md:text-left capitalize md:px-20'>Welcome to the {user && user.role} user</p>
            </div>
     
    

        </div>


   
   
    </div>
    </>
  )
}

export default Profile