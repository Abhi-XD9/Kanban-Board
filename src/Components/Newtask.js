import React, { useState, useRef } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';
import { useTasks } from './Context';
import { Toast } from 'primereact/toast';

export default function Newtask() {

  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const Navigate = useNavigate()
  const { addTask, tasks } = useTasks()

  const handleSubmit = (e) => {
    e.preventDefault();

    if (title.trim() === '' || description.trim() === '') {
      alert('Please fill in both title and description fields');
    } else {
      const newTask = {
        id: tasks.length > 0 ? Math.max(...tasks.map(task => task.id)) + 1 : 1,
        title: title,
        description: description,
        status: "todo"
      };
      addTask(newTask);
      showSuccess()
      setTitle('')
      setDescription('')
    }

  }

  const handleCancell = () => {
    Navigate('/')
    
  }

  const toast = useRef(null);

  const showSuccess = () => {
    toast.current.show({ severity: 'success', summary: 'Success', detail: 'Task Created Successfully', life: 3000 });
  }

  return (
    <div className='d-flex vh-100 justify-content-center align-items-center bg-secondary'>
      <Toast ref={toast} />
      <form id='form' onSubmit={handleSubmit}>
        <h1>Add New Task</h1>
        <div id='form-title' className='mb-3'>
          <label htmlFor="text">Title</label>
          <input type="text"
            placeholder='Enter the Title' className='form-control' value={title} onChange={(e) => setTitle(e.target.value)} />
        </div>
        <div id='form-descp' className='mb-3'>
          <label htmlFor="text">Description</label>
          <textarea className='form-control' placeholder='Description' value={description} onChange={(e) => setDescription(e.target.value)} ></textarea>
        </div>
        <div className='d-flex  gap-2'>
          <button id='add-btn' type="submit" className='btn'>ADD  </button>
          <button id='add-btn' type="button" onClick={handleCancell}>Cancell.</button>
          <button id='add-btn' type="button" onClick={() => Navigate('/')}>Return to tasks</button>
        </div>
      </form>
    </div>
  )
}
