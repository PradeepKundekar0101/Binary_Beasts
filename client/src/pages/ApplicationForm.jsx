import React from 'react'
import {setUser} from '../store/slices/auth'
import {useSelector,useDispatch} from 'react-redux'
const ApplicationForm = () => {
    const dispatch = useDispatch();
    const userStored = useSelector((state)=>{return state.user});
    const token = useSelector((state)=>{return state.token});
    const profileImage = userStored.profilePicture;

   const [user, set1User] = useState({
    firstname: userStored.username,
    lastname:userStored.lastname,
    role:userStored.role,
  });

  const [selectedOption, setSelectedOption] = useState('teacher');
  const handleSelectChange = (event) => {
    setSelectedOption(event.target.value);
  };
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    set1User({ ...user, [name]: value });
  };
  const handleSubmit  = async(e)=>{
    if(user.firstname.length<3){
      alert("Firstname must be atleast 3 characters long");
      return;
    }
    const {data} = await axios.put("http://localhost:8080/user/update",{
      firstname: user.firstname,lastname: user.lastname, role:user.role
    },{
      headers:{
        'Authorization': token,
      }
    });
    if(data.success)
    {
      alert("Updated Successfully");
      dispatch(setUser(data.data));
    }
    else{
      alert("Failed");
    }
  }


  return (
    <div>
    <div className="bg-gray-200 min-h-screen flex items-center justify-center">
      <div className="bg-white w-[80vw]  p-8 rounded-lg shadow-lg">
        <img src={profileImage} className='rounded-full h-32 w-32' alt="profile" />
        <h1 className="text-2xl font-semibold mb-4">User Dashboard</h1>

        <div className="mb-4">
          <label htmlFor="username" className="block font-medium text-gray-600">
            First Name:
          </label>
          <input
            type="text"
            id="username"
            name="username"
            value={user.username}
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
            name="username"
            value={user.lastname}
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
          Update
        </button>
      </div>
    </div>
    </div>
  )
}

export default ApplicationForm