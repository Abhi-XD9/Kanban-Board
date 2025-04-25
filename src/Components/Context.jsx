
import React, { createContext, useState, useContext, useRef } from 'react';
import { Toast } from 'primereact/toast';

const TaskContext = createContext();

export function useTasks() {
  return useContext(TaskContext);
}

export default function Context({ children }) {
  const [tasks, setTasks] = useState([
    { id: 1, title: "Dummy Task 1", description: "You can Drag and Drop this into the Other Column.", status: "todo" },
    { id: 2, title: "Draggable Task 2", description: "Create a Task card to Track the progress of tasks.", status: "inprogress" },
    { id: 3, title: "Draggable Task 3", description: "You can Drag and Drop this into the Other Column.", status: "review" },
    { id: 4, title: "Draggable Task 4", description: "You can Drag and Drop this into the Other Column.", status: "done" },
  ]);

  const [search, setSearch] = useState("");

  const toast = useRef(null);

  const addTask = (task) => {
    setTasks((prevTasks) => {
      const filteredTasks = prevTasks.filter((t) => t.id !== task.id);
      return [...filteredTasks, task];
    });
  };

  const deleteTask = (id) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
    showerror()
  };

  const getFilteredTasks = (status) => {
    return tasks.filter(task => 
      task.status === status && 
      task.title.toLowerCase().includes(search.toLowerCase())
    );
  };

  const showerror = () => {
    toast.current.show({ severity: 'warn', summary: 'Deleted.', detail: 'Task has been deleted.', life: 3000 });
  };

  return (
    <TaskContext.Provider value={{ tasks, addTask, deleteTask, getFilteredTasks, search, setSearch, showerror }}>
      <>
        {children}
        <Toast ref={toast} />
      </>
    </TaskContext.Provider>
  );
};

