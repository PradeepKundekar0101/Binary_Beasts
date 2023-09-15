import axios from 'axios';
import React,{useState,useEffect} from 'react'
import {FaTrashAlt,FaEdit} from 'react-icons/fa'
import { Link } from 'react-router-dom';
const Products = () => {
    const [items,setItems] = useState([]);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [selectedItemtoDelete,setSelectedItemtoDelete] = useState(null);
    const openDeleteModal = () => {
        setIsDeleteModalOpen(true);
    };
    const closeDeleteModal = () => {
      setIsDeleteModalOpen(false);
    };
    const fetchAllItems =async ()=>{
        try {
            const {data} = await axios.get("http://localhost:8080/items/getAll");
            setItems(data.data)
        } catch (error) {   
        }
    }
    useEffect(() => {
     fetchAllItems();
    }, [])
    
    const deleteItem =async(id)=>{
        try {
            const {data} =await axios.delete(`http://localhost:8080/items/delete/${id}`);
            console.log(data);
            if(data.success){
                closeDeleteModal();
                const updatedList = items.filter((e)=>{return e._id!=selectedItemtoDelete})
                setItems(updatedList);
            }
        } catch (error) {
            
        }
    }
  return (
    <div>
       {isDeleteModalOpen && (
        <div
          id="popup-modal"
          className="fixed top-0 left-0 right-0 z-50 p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full"
        >
          <div className="relative w-full max-w-md max-h-full">
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
      )}

        <h1 className='text-center text-2xl md:text-5xl font-bold md:px-20 md:text-left'>Items</h1>
        <Link to='/additem' className='px-3 py-2 bg-blue-600 rounded-lg text-white  md:mx-20 md:my-20'>Add Item</Link>
    <div className="grid-cols-2 sm:grid md:grid-cols-3 md:px-20">
        { 
           items &&  items.map((element,i) => {return <div key={i} className="max-w-sm mx-auto my-4 md:mx-2 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
            <a href="#">
              <img className="rounded-t-lg" src={`http://localhost:8080/${element.image}`} alt="" />
            </a>
            <div className="p-5">
              <a href="#">
                <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{element.name}</h5>
              </a>
              <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">{element.description.slice(0,50)+"...  "}</p>
           <div className="flex items-center">
              <button data-modal-target="defaultModal" onClick={()=>{ setSelectedPost(element); openModal()}} data-modal-toggle="defaultModal" className="inline text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" type="button">
                Show More
              </button>
            
            <button onClick={()=>{openDeleteModal();setSelectedItemtoDelete(element._id)}} className='text-red-400 text-2xl'>
               <FaTrashAlt/>
            </button  >
            <Link to={`/update/${element._id}`} className='text-blue-400 text-2xl' ><FaEdit/></Link>
            </div>   
            </div>

          </div>
            })
        }
     
      
      
     
    </div>

       
    </div>
  )

}
export default Products


