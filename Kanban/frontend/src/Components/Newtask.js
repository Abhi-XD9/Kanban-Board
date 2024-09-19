import React, { useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';



export default function Newtask() {

const[title,setTitle]=useState('')
const[description,setDescription]=useState('')
const Navigate = useNavigate()

const handleSubmit=()=>{

  if (title.trim() === '' || description.trim() === '') {
    alert('Please fill in both title and description fields');
  }else{
    axios.post('http://localhost:9000/tasks',{title,description})
  .then(res=>console.log(res.data))
  .catch(err=>console.log(err))
  Navigate('/')
  }
}
  return (
    <div className='d-flex vh-100 justify-content-center align-items-center bg-secondary'>
      <form id='form' onSubmit={handleSubmit}>
        <h1>Add New Task</h1>
          <div id='form-title' className='mb-3'>
              <label htmlFor="text">Title</label>
              <input type="text" 
               placeholder='Enter the Title'  className='form-control' onChange={(e)=>setTitle(e.target.value)}/>
          </div>
          <div id='form-descp' className='mb-3'>
              <label htmlFor="text">Description</label>
              <input type="text" placeholder='Description'  className='form-control' onChange={(e)=>setDescription(e.target.value)}/>
          </div>
          <button id='add-btn' className='btn'>ADD</button>
      </form>
    
  </div>
  )
}

