
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { FaTrashAlt, FaEdit } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import Navbar from '../components/NavBar';
const ManageProducts = () => {
    const [items, setItems] = useState([]);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedItemtoDelete, setSelectedItemtoDelete] = useState(null);
  const [currentFilter, setCurrentFilter] = useState('All'); // Initial filter is set to 'All'

  const openDeleteModal = () => {
    setIsDeleteModalOpen(true);
  };

  const closeDeleteModal = () => {
    setIsDeleteModalOpen(false);
  };

  const fetchAllItems = async () => {
    try {
      const { data } = await axios.get("http://localhost:8080/items/getAll");
      setItems(data.data);
    } catch (error) {
      // Handle the error
    }
  };

  useEffect(() => {
    fetchAllItems();
  }, []);

  const deleteItem = async (id) => {
    try {
      const { data } = await axios.delete(`http://localhost:8080/items/delete/${id}`);
      console.log(data);
      if (data.success) {
        closeDeleteModal();
        const updatedList = items.filter((e) => e._id !== selectedItemtoDelete);
        setItems(updatedList);
      }
    } catch (error) {
      // Handle the error
    }
  };

  // Filter items based on the current filter criteria
  const filteredItems = items.filter((element) => {
    if (currentFilter === 'All') {
      return true; // Show all items
    } else {
      return element.category === currentFilter;
    }
  });

  return (
    <div>
        <Navbar/>
{isDeleteModalOpen && (
            <div
            id="popup-modal"
            className="fixed top-0 left-0 right-0 z-50 p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full"
          >
            <div className="relative mx-auto w-full max-w-md max-h-full">
              <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                <button
                  onClick={closeDeleteModal}
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
                    Are you sure you want to delete this product?
                  </h3>
                  <button
                    onClick={()=>{
                      deleteItem(selectedItemtoDelete);
                    }}
                    type="button"
                    className="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center mr-2"
                  >
                    Yes, I'm sure
                  </button>
                  <button
                    onClick={closeDeleteModal}
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

<div className="relative overflow-x-auto shadow-md sm:rounded-lg">
    <table className="w-[95vw] mx-auto rounded-md my-5  text-sm text-left text-gray-500 dark:text-gray-400">
        <caption className="p-5  text-lg font-semibold text-left text-gray-900 bg-white dark:text-white dark:bg-gray-800">
            Our products
            <p className="mt-1 mb-4 text-sm font-normal text-gray-500 dark:text-gray-400">Browse a list of Flowbite products designed to help you work and play, stay organized, get answers, keep in touch, grow your business, and more.</p>
        <Link className='bg-green-600 rounded-md px-3 py-2 my-2' to="/additem">Add Item</Link>
        </caption>
        <thead className="text-xs text-gray-700 uppercase round bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
                <th scope="col" className=" text-center text-lg px-6 py-3">
                    Item name
                </th>
                <th scope="col" className="text-center text-lg px-6 py-3">
                    Category
                </th>
                <th scope="col" className="text-center text-lg px-6 py-3">
                    Quantity
                </th>
                <th scope="col" className="text-center text-lg px-6 py-3">
                    Actions
                </th>
               
                
            </tr>
            
            {items.map((element,i)=>{
                return  <tr className="bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-600">
                <th scope="row" className="text-center text-lg px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                   {element.name}
                </th>
                <td className="text-center text-lg px-6 py-4">
                {element.category}
                </td>
                <td className="text-center text-lg px-6 py-4">
                {element.quantity}
                </td>
                <td className="px-6 py-4 flex items-center justify-center space-x-2 text-right">
                <button onClick={()=>{openDeleteModal();setSelectedItemtoDelete(element._id)}} className='text-red-400 text-2xl'>
               <FaTrashAlt/>
            </button  >
            <Link to={`/update/${element._id}`} className='text-blue-400 text-2xl' ><FaEdit/></Link>
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

export default ManageProducts