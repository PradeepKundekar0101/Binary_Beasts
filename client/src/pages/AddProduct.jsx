import React, { useState } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { setUser } from '../store/slices/auth';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/NavBar';

const AddProduct = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userStored = useSelector((state) => state.user);
  const token = useSelector((state) => state.token);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [quantity, setQuantity] = useState(0);
  const [location, setLocation] = useState('');
  const [category, setCategory] = useState('');
  const [image, setImage] = useState(null);

  const [selectedOption, setSelectedOption] = useState('teacher');
  const handleSelectChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  const handleQuantityChange = (e) => {
    setQuantity(e.target.value);
  };

  const handleLocationChange = (e) => {
    setLocation(e.target.value);
  };

  

  const handleImageChange = (e) => {
    const selectedImage = e.target.files[0];
    setImage(selectedImage);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('name', name);
    formData.append('description', description);
    formData.append('quantity', quantity);
    formData.append('location', location);
    formData.append('category', selectedOption);
    formData.append('image', image);
    formData.append('userId', userStored._id);

    try {
      const { data } = await axios.post('http://localhost:8080/items/add', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': token,
        },
      });

      if (data.success) {
        alert('Item Uploaded Successfully');
        navigate("/items")
      }
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <>
      <Navbar />
      <h1 className='text-center text-2xl font-bold'>Add an Item</h1>
      <form onSubmit={handleSubmit} className='w-[80vw] mx-auto'>
        <div className="mb-6">
          <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Item Name
          </label>
          <input
            min={4}
            type="text"
            id="name"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            placeholder="Enter item name"
            value={name}
            onChange={handleNameChange}
            required
          />
        </div>
       

       
        <div className="mb-6">
          <label htmlFor="image" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Upload Image
          </label>
          <input
            type="file"
            id="image"
            accept="image/*"
            className="block w-full p-2.5 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500"
            onChange={handleImageChange}
          />
        </div>
        <div className="mb-6">
            <label htmlFor="description" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Item Description
            </label>
            <textarea
                min={10}
                id="description"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Enter item description"
                value={description}
                onChange={handleDescriptionChange}
                required
            />
            </div>

            <div className="mb-6">
            <label htmlFor="quantity" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Item Quantity
            </label>
            <input
                type="number"
                id="quantity"

                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                placeholder="Enter item quantity"
                value={quantity}
                onChange={handleQuantityChange}
                required
            />
            </div>

            <div className="mb-6">
            <label htmlFor="location" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Item Location
            </label>
            <input
                type="text"
                min={3}
                id="location"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                placeholder="Enter item location"
                value={location}
                onChange={handleLocationChange}
                required
            />
            </div>

            <div className="mb-4">
          <label htmlFor="role" className="block font-medium text-gray-600">
            Category
          </label>
          <select value={selectedOption} className="w-full p-2 border rounded-md" onChange={handleSelectChange}>
                <option value="hardware">Hardware</option>
                <option value="software">Software</option>
                <option value="consumables">Consumables</option>
            </select>
        </div>


        <button
          type="submit"
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Submit
        </button>
      </form>
    </>
  );
};

export default AddProduct;
