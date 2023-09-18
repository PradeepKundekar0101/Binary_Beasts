import React from 'react'
import Navbar from '../components/NavBar'
import {FaRoute,FaCartPlus,FaClipboard,FaEnvelope,FaUserAlt,FaAlignJustify} from 'react-icons/fa'
const Home = () => {
  return (
    <div>
        <Navbar/>
        <header className="h-[40vw] flex items-center hero from-blue-400 via-blue-500 to-blue-600 text-white py-20">
      <div className="container mx-auto text-center">
        <h2 className="text-[5rem] heading  font-bold mb-4">Efficient Inventory Management</h2>
        <p className="text-2xl font-medium mb-8">Streamline your business operations with our powerful Inventory Management System.</p>
       
      </div>
    </header>
  
    <section className="py-16">
      <div className="container mx-auto text-center">
        <h2 className="text-5xl font-bold mb-6">Key Features</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="p-4 bg-white rounded shadow-lg">
    <FaRoute className='text-5xl mx-auto text-blue-600 my-5'/>
            <h3 className="text-xl font-semibold mb-2">Inventory Tracking</h3>
            <p>Keep a detailed record of your inventory items with ease.</p>
          </div>
          <div className="p-4 bg-white rounded shadow-lg">
          <FaCartPlus className='text-5xl mx-auto text-blue-600 my-5'/>
            <h3 className="text-xl font-semibold mb-2">Order Management</h3>
            <p>Efficiently manage orders, deliveries, and returns.</p>
          </div>
          <div className="p-4 bg-white rounded shadow-lg">
          <FaClipboard className='text-5xl mx-auto text-blue-600 my-5'/>
            <h3 className="text-xl font-semibold mb-2">Reporting & Analytics</h3>
            <p>Gain insights with powerful reporting and analytics tools.</p>
          </div>
          <div className="p-4 bg-white rounded shadow-lg">
          <FaEnvelope className='text-5xl mx-auto text-blue-600 my-5'/>
            <h3 className="text-xl font-semibold mb-2">Notification</h3>
            <p>Receive Real Time notifications.</p>
          </div>
          <div className="p-4 bg-white rounded shadow-lg">
          <FaUserAlt className='text-5xl mx-auto text-blue-600 my-5'/>
            <h3 className="text-xl font-semibold mb-2">Efficient User Management</h3>
            <p>Gain insights with powerful reporting and analytics tools.</p>
          </div>
          <div className="p-4 bg-white rounded shadow-lg">
          <FaAlignJustify className='text-5xl mx-auto text-blue-600 my-5'/>
            <h3 className="text-xl font-semibold mb-2">Reporting & Analytics</h3>
            <p>Gain insights with powerful reporting and analytics tools.</p>
          </div>
        
        </div>
      </div>
    </section>



    <section className="bg-[#292929] py-16">
    
      <div className="container mx-auto text-left">
        <h2 className="text-4xl font-semibold text-white mb-6">About Us</h2>
        <p className="text-white mb-8 text-lg ">
          At InventoryPro, we're dedicated to providing cutting-edge inventory management solutions for businesses of all sizes.
          With years of experience in the industry, we understand the challenges you face when it comes to keeping track of your
          inventory efficiently and accurately.
        </p>
        <p className="text-white mb-8">
          Our mission is to simplify the complexities of inventory management, enabling you to focus on what you do best—growing
          your business. We believe that a well-organized and optimized inventory system is the backbone of any successful
          enterprise.
        </p>
      
      </div>
     
    </section>

    <footer className="bg-gray-800 text-white py-8">
      <div className="container mx-auto text-center">
        <p>&copy; 2023 Inventory Management System</p>
      </div>
    </footer>
  </div>
  )
}

export default Home