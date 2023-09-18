import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { FaTrashAlt, FaEdit } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import Navbar from '../components/NavBar';
import {format} from 'timeago.js'
const ManageOrders = () => {
  const [orders, setOrders] = useState([]);
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [isCancelConfirmModalOpen, setIsCancelConfirmModalOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [cnt,setCnt] = useState(0);
  const openConfirmModel = () => {
    setIsConfirmModalOpen(true);
  };

  const closeConfirmModel = () => {
    setIsConfirmModalOpen(false);
  };

  const openCancelConfirmModel = ()=>{
    setIsCancelConfirmModalOpen(true);
  }

  const closeCancelConfirmModel = ()=>{
    setIsCancelConfirmModalOpen(false);
  }
  const fetchAllOrders = async () => {
    try {
      const { data } = await axios.get("http://localhost:8080/orders/getAllOrders");
      setOrders(data);
      orders.forEach((e)=>{e.confirmed? setCnt(cnt+1):setCnt(cnt)});
    } catch (error) {
     console.log(error.message)
    }
  };

  useEffect(() => {
    fetchAllOrders();
  }, []);

  const confirmOrder = async () => {
    try {
      const { data } = await axios.put(`http://localhost:8080/orders/${selectedOrder._id}`);
    
      if (data.success)
      {
        
        const tempOrder = orders.filter((e)=>{return e._id!=selectedOrder._id});
        setOrders(tempOrder);
        const decRes = await axios.put(`http://localhost:8080/items//decrease-quantity/${selectedOrder.item_id}`,{ quantity:selectedOrder.quantity});
        
        closeConfirmModel();
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const deleteOrder = async()=>{
    try {
      const { data } = await axios.delete(`http://localhost:8080/orders/${selectedOrder._id}`);
      if (data.success)
      {
        closeCancelConfirmModel();
        const tempOrder = orders.filter((e)=>{return e._id!=selectedOrder._id});
        setOrders(tempOrder);
      }
    } catch (error) {
      console.log(error.message);
    }
  }
 
  return (
    <div>
        <Navbar/>
{isCancelConfirmModalOpen && (
            <div
            id="popup-modal"
            className="fixed top-0 left-0 right-0 z-50 p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full"
          >
            <div className="relative mx-auto w-full max-w-md max-h-full">
              <div className="relative   bg-white rounded-lg shadow dark:bg-gray-700">
                <button
                  onClick={closeCancelConfirmModel}
                  type="button"
                  className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                  data-modal-hide="popup-modal"
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
                <div className="p-6 text-center">
                  <svg
                    className="mx-auto mb-4 text-gray-400 w-12 h-12 dark:text-gray-200"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 20 20"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M10 11V6m0 8h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                    />
                  </svg>
                  <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                    Are you sure you want to delete this order?
                  </h3>
                  <button
                    onClick={()=>{
                      deleteOrder()
                    }}
                    type="button"
                    className="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center mr-2"
                  >
                    Yes, I'm sure
                  </button>
                  <button
                    onClick={closeCancelConfirmModel}
                    type="button"
                    className="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600"
                  >
                    No, cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        // Delete modal content (same as before)
      )}

{isConfirmModalOpen && (
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
                  onClick={closeConfirmModel}
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
                    The order will be confirmed and the Quantity will be deducted
                </p>
                
              </div>
              {/* Modal footer */}
              <div className="flex items-center p-6 space-x-2 border-t border-gray-200 rounded-b dark:border-gray-600">
                <button
                  onClick={()=>{confirmOrder()}}
                  type="button"
                  className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  Confirm Order
                </button>
                <button
                  onClick={closeConfirmModel}
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



<div className="relative overflow-x-auto shadow-md sm:rounded-lg">
    <table className="w-[95vw] mx-auto rounded-md my-5  text-sm text-left text-gray-500 dark:text-gray-400">
        <caption className="p-5  text-lg font-semibold text-left text-gray-900 bg-white dark:text-white dark:bg-gray-800">
            Orders to Confirm
           
        </caption>
        <thead className="text-xs text-gray-700 uppercase round bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
                <th scope="col" className=" text-center text-lg px-6 py-3">
                    User
                </th>
                <th scope="col" className="text-center text-lg px-6 py-3">
                    Item
                </th>
                <th scope="col" className="text-center text-lg px-6 py-3">
                    Quantity
                </th>
                <th scope="col" className="text-center text-lg px-6 py-3">
                    Actions
                </th>
               
                
            </tr>
            {cnt===orders.length?<h1 className=''>No Order</h1>:<></>}
            {orders.map((element,i)=>{
            
                return   !element.confirmed &&  <tr className="bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-600">
                <th scope="row" className="text-center lowercase text-lg px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                   {element.user_email}
                   <span className='text-sm font-light bg-slate-600 text-white px-2 rounded-full mx-2'>
                    {
                      format(element.createdAt)
                    }
                    </span>
                </th>
                <td className="text-center text-lg px-6 py-4">
                {element.item_name}
                </td>
                <td className="text-center text-lg px-6 py-4">
                {element.quantity}
                </td>
                <td className="px-6 py-4 flex items-center justify-center space-x-2 text-right">
                <button onClick={()=>{openConfirmModel();setSelectedOrder(element)}} className='text-green-100 text-xl bg-green-900 rounded-md px-2 py-1'>
                  Confirm
            </button>

            <button onClick={()=>{setSelectedOrder(element);openCancelConfirmModel();}} className='text-red-100 text-xl bg-red-900 rounded-md px-2 py-1'>
                  Cancel
            </button>

                </td>
            </tr>
            })}

           
        </thead>
        <tbody>
           
            
           
        </tbody>
    </table>
</div>




    </div>
  )
}

export default ManageOrders