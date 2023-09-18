import React,{useState,useEffect} from 'react'
import {setUser} from '../store/slices/auth'
import {useSelector,useDispatch} from 'react-redux'
import axios from 'axios'
const ApplicationForm = () => {
    const dispatch = useDispatch();
    const userStored = useSelector((state)=>{return state.user});
    const token = useSelector((state)=>{return state.token});
    const [alreadySubmitted,setAlreadySubmitted] = useState(false);
    const profileImage = userStored.profilePicture;

   const [user, set1User] = useState({
    user_id:userStored._id,
    firstname: userStored.firstname,
    lastname:userStored.lastname,
    phonenumber:userStored.phonenumber,
    role:"",
  });
  const fetchApplication = async()=>{
    try {
      const {data} = await axios.get("http://localhost:8080/userapplication/allApplications");
      if(data.success)
      {
        
        const exists = data.data.some(obj => obj.email === userStored.email);
        if (exists) {
          setAlreadySubmitted(true);
        } else {
          setAlreadySubmitted(false);
        }
      }
    } catch (error) {
      console.log(error.message)
    }
  }
  const fetchUser =async()=>{
      console.log(userStored._id);
      const {data} = await axios.get(`http://localhost:8080/user/${userStored._id}`);
      console.log(data)
      dispatch(setUser(data.data));
  }
  useEffect(() => {
    fetchApplication();
    fetchUser();
  }, [])
  


  const [selectedOption, setSelectedOption] = useState('teacher');
  const handleSelectChange = (event) => {
    setSelectedOption(event.target.value);
  };
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    set1User({ ...user, [name]: value });
  };
  const handleSubmit  = async(e)=>{
    console.log(user);
    if(user.firstname.length<3){
      alert("Firstname must be atleast 3 characters long");
      return;
    }
    const {data} = await axios.post("http://localhost:8080/userapplication/add",{user_id:user.user_id,
      firstname: user.firstname,lastname: user.lastname, email:userStored.email,role:selectedOption,phonenumber:user.phonenumber,profilePicture:userStored.profilePicture
    });
    if(data.success)
    {
      alert("Application Submitted Successfully");
      window.location.reload();
    }
    else{
      alert("Failed");
    }
  }
  return (
    <div>
      {
        alreadySubmitted? <div className='flex h-screen items-center justify-center flex-col'>
          <h1 className='text-center text-5xl'>Hang On! Your profile is under review </h1>
          <img className='mx-auto' src="https://cdni.iconscout.com/illustration/premium/thumb/wait-a-minute-6771645-5639826.png" alt="" />

        </div>: <div className="bg-gray-200 min-h-screen flex items-center justify-center">
      <div className="bg-white w-[80vw]  p-8 rounded-lg shadow-lg">
        <img src={profileImage} className='rounded-full h-32 w-32' alt="profile" />
        <h1 className="text-2xl font-semibold mb-4">Verify your profile</h1>
        <div className="mb-4">
          <label htmlFor="username" className="block font-medium text-gray-600">
            First Name:
          </label>
          <input
            type="text"
            id="username"
            name="firstname"
            value={user.firstname}
            onChange={handleInputChange}
            className="w-full p-2 border rounded-md"
            />
        </div>

        <div className="mb-4">
          <label htmlFor="username" className="block font-medium text-gray-600">
            Last Name:
          </label>
          <input
            type="text"
            id="username"
            name="lastname"
            value={user.lastname}
            onChange={handleInputChange}
            className="w-full p-2 border rounded-md"
            />
        </div>

        <div className="mb-4">
          <label htmlFor="phonenumber" className="block font-medium text-gray-600">
            Contact Number
          </label>
          <input
            type="number"
            id="username"
            name="phonenumber"
            value={user.phonenumber}
            onChange={handleInputChange}
            className="w-full p-2 border rounded-md"
            />
        </div>


        <div className="mb-4">
          <label htmlFor="role" className="block font-medium text-gray-600">
            Role
          </label>
          <select value={selectedOption} className="w-full p-2 border rounded-md" onChange={handleSelectChange}>
                <option value="teacher">Teacher</option>
                <option value="staff">Staff member</option>
            </select>
        </div>
      
       
        <button onClick={()=>{handleSubmit()}} className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600">
          Submit Application
        </button>
      </div>
    </div>
    

      }
      </div>
   
  )
}

export default ApplicationForm