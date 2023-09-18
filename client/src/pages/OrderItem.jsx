import React,{useEffect,useState} from 'react'
import NavBar from '../components/NavBar'
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
const OrderItem = () => {
  const navigate = useNavigate();
  const user = useSelector((state)=>{return state.user});
  const token = useSelector((state)=>{return state.token});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => {
    setIsModalOpen(true);
  };
  const closeModal = () => {
    setIsModalOpen(false);
  };
  const [item,setItem] = useState(null);
  const {id} = useParams();
  const fetchProduct=async()=>{
    try {
      const {data} = await axios.get("http://localhost:8080/items/"+id);
      setItem(data.data);
    } catch (error) {
      console.log(error.message)
    }
  }
  useEffect(() => {
   if(user.role!=='teacher')
    navigate("/");
    fetchProduct();
  }, [])

  const [currentNumber, setCurrentNumber] = useState(0);
  const decrementNumber = () => {
    setCurrentNumber(currentNumber - 1);
  };
  const incrementNumber = () => {
    setCurrentNumber(currentNumber + 1);
  };
  const handleConfirm = async()=>{
    try {
      const {data} = await axios.post("http://localhost:8080/orders/placeOrder",{
        user_id:user._id,
        user_email:user.email,
        quantity:currentNumber,
        item_id:item._id,
        item_name:item.name
      },{
        headers:{
          "Authorization":token
        }
      });
      if(data.success)
      {
        closeModal();
        alert("Order Placed!");
        navigate("/items")
      }
    } catch (error) {
      console.log(error.message);
    }
  }
  return (
    <div>
      {/* Main modal */}
      {isModalOpen && (
        <div
          className="fixed top-0 left-0  right-0 z-50 w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full"
          id="staticModal"
          data-modal-backdrop="static"
          tabIndex="-1"
          aria-hidden="true"
        >
          <div className="relative w-full mx-auto max-w-2xl max-h-full">
            {/* Modal content */}
            <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
              {/* Modal header */}
              <div className="flex items-start justify-between p-4 border-b rounded-t dark:border-gray-600">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                  Confirm Order
                </h3>
                <button
                  onClick={closeModal}
                  type="button"
                  className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                  data-modal-hide="staticModal"
                >
                  <svg
                    className="w-3 h-3"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 14 14"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                    />
                  </svg>
                  <span className="sr-only">Close modal</span>
                </button>
              </div>
              {/* Modal body */}
              <div className="p-6 space-y-6">
                <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                    The order will be confirmed by the Admin or the Stuff.
                </p>
                
              </div>
              {/* Modal footer */}
              <div className="flex items-center p-6 space-x-2 border-t border-gray-200 rounded-b dark:border-gray-600">
                <button
                  onClick={handleConfirm}
                  type="button"
                  className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  Place Order
                </button>
                <button
                  onClick={closeModal}
                  type="button"
                  className="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      <NavBar/>
      <div className="container flex w-[80vw] mx-auto">
        <div className="left">
       {item && <img className='h-78 my-5 w-78  bg-slate-50 p-5 rounded-md' src={`http://localhost:8080/${item.image}`} alt="" /> }
        </div>
        <div className="right pt-10 px-4">
        <h1 className='text-left font-bold text-6xl'>{item && item.name}</h1>
        <p className='text-left my-5'>{item && item.description}</p>
        <p className='text-left my-5'>Quantity - {item && item.quantity}</p>
<div className='flex items-center'>

        <p className='mr-4'>Select Quantity    </p>
        <div className="text-center">
       <button className='p-3 bg-slate-200' disabled={currentNumber<=0} onClick={decrementNumber}>-</button>
        <span className='mx-5'>{currentNumber}</span>
        <button className='p-3 bg-slate-200' disabled={item && currentNumber>=item.quantity} onClick={incrementNumber}>+</button>
</div>
    </div>
    <button
        onClick={openModal}
        className="block text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        type="button"
        disabled={item && item.quantity===0}
      >
        {item && item.quantity===0?"Out of Stock":"Order Now"}
      
      </button>
{/* 
      <button className='bg-black text-white px-4 py-2'>Order Now</button> */}
        </div>
      </div>
    </div>
  )
}

export default OrderItem