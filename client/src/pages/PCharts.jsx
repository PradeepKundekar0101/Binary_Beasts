
import axios from 'axios';
import React,{useEffect,useState} from 'react';
import {BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, PieChart, Pie, Cell } from 'recharts';

import Navbar from '../components/NavBar';

const COLORS = ['#e67e22', '#16a085', '#ecf0f1'];

const PCharts = () => {
  const [data1,setData1] = useState([]);
  const fetchCnt = async()=>{
    try {
      const {data} = await axios.get(`http://localhost:8080/items/cat`);
      const objectData =[ { name: 'Hardware', value: data.data[0] },
      { name: 'Software', value: data.data[1] },
      { name: 'Consumables', value: data.data[2] },]
      setData1(objectData)
    } catch (error) {
      console.log(error.message);
    }
  }
  useEffect(() => {
    fetchCnt()
  }, [])
  
  return (
    <>
     <Navbar/>
    <div className="charts-container flex bg-slate-900 justify-center h-[40vw] items-center flex-col">
    <h1 className='text-center text-white text-5xl py-5'>Visual Representation</h1>
    <div className='flex'>
    <BarChart width={400} height={400} data={data1}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Legend />
      <Bar dataKey="value" fill="#8884d8" />
    </BarChart>

    <PieChart width={400} height={400}>
      <Pie
        dataKey="value"
        data={data1}
        cx="50%"
        cy="50%"
        outerRadius={100}
        fill="#8884d8"
        label
      >
        {data1.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
        ))}
      </Pie>
      <Tooltip />
      <Legend />
    </PieChart>
   <h1 className='text-center text-3xl'>
          
   </h1>
    </div>
    </div>
   
    
    
    </>
  );
};

export default PCharts;
