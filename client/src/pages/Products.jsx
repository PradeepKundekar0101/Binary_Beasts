import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { FaTrashAlt, FaEdit,FaSearch} from 'react-icons/fa';
import {format} from 'timeago.js'
import { Link } from 'react-router-dom';
import Navbar from '../components/NavBar';

const Products = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [items, setItems] = useState([]);
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
      return element.name.toLowerCase().includes(searchQuery.toLowerCase()); // Filter by item name
    } else {
      return (
        element.category === currentFilter &&
        element.name.toLowerCase().includes(searchQuery.toLowerCase()) // Filter by both category and item name
      );
    }
  });

  return (
    <div>
        <Navbar/>
        
     
      <h1 className='text-center text-2xl my-4 md:text-5xl font-bold md:px-20 md:text-left md:mb-5'>Items</h1>
      {/* <Link to='/additem' className='px-3 py-2 bg-blue-600 rounded-md text-white  md:mx-20 md:my-20'>Add Item</Link> */}

      {/* Filter buttons */}
      <div className="container flex w-full my-10 justify-center space-x-5 mx-auto">
        <button onClick={() => setCurrentFilter('All')} className={`px-4 rounded-lg py-2 ${currentFilter === 'All' ? 'bg-blue-700 text-white' : 'bg-gray-200'}`}>All</button>
        <button onClick={() => setCurrentFilter('hardware')} className={`px-4 rounded-lg py-2 ${currentFilter === 'hardware' ? 'bg-blue-700 text-white' : 'bg-gray-200'}`}>Hardware</button>
        <button onClick={() => setCurrentFilter('software')} className={`px-4 rounded-lg py-2 ${currentFilter === 'software' ? 'bg-blue-700 text-white' : 'bg-gray-200'}`}>Software</button>
        <button onClick={() => setCurrentFilter('consumables')} className={`px-4 rounded-lg py-2 ${currentFilter === 'consumables' ? 'bg-blue-700 text-white' : 'bg-gray-200'}`}>Consumables</button>
      </div>

      <div className="container flex w-full my-10 items-center justify-center space-x-5 mx-auto">
     < FaSearch/>
      <input
          type="text"
          placeholder="Search items..."
          className="px-4 py-2 rounded-lg border border-gray-300 focus:ring-blue-400 focus:border-blue-400"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <div className="grid-cols-2 sm:grid md:grid-cols-3 md:px-20">
        {filteredItems.reverse().map((element, i) => {
          return (
            <div key={i} className="max-w-sm mx-auto my-4 md:mx-2  bg-white border border-gray-200 rounded-lg shadow-md">
            <a href="#">
              <img className="rounded-t-lg h-52 w-full object-cover" src={`http://localhost:8080/${element.image}`} alt="" />
            </a>
            <div className="p-5">
              <a href="#">
                <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 ">{element.name}</h5>
              </a>
              <p className="mb-3 font-normal text-gray-700">{element.description.slice(0,50)+"...  "}</p>
           <div className="">
            
              <Link to={`/order/${element._id}`} data-modal-target="defaultModal"  data-modal-toggle="defaultModal" className="inline text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-sm text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" type="button">
                Order Now
              </Link>
            <span className='px-2 mx-2 py-1 bg-slate-200 my-4 rounded-lg'>{element.quantity} Left</span>
            
           
            </div>   
            </div>

            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Products;
