import React  from "react";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import Taskcard from "./Taskcard";
import Navbar from "../Navbar";
import { useTasks } from "./Context";


const Home = () => {
  const { tasks, addTask } = useTasks();


  const updateTaskStatus = (taskId, newStatus) => {
    const taskToUpdate = tasks.find((task) => task.id === taskId);
    if (taskToUpdate) {
      const updatedTask = { ...taskToUpdate, status: newStatus };
      const filteredTasks = tasks.filter((task) => task.id !== taskId);
      addTask(updatedTask);
      filteredTasks.forEach((task) => addTask(task));
    }
  };

  const handleOnDragEnd = (result) => {
    const { destination, draggableId } = result;
    const taskId = parseInt(draggableId, 10);

    if (!destination){
      return
    }else{
      updateTaskStatus(taskId, destination.droppableId);
    }

  };

  

  const DroppableContainer = ({ droppableId, title, children }) => (
    <Droppable droppableId={droppableId}>
      {(provided) => (
        <div id="container" ref={provided.innerRef} {...provided.droppableProps} className="d-flex m-2">
          <h1>{title}</h1>
          <div>{children}</div>
          {provided.placeholder}
        </div>
      )}
    </Droppable>
  );

  

  return (
    <DragDropContext  onDragEnd={handleOnDragEnd}>
      <div className="App">
        <Navbar/>
        <div className="w-100vw">
          <div className="d-flex">
            <DroppableContainer droppableId="todo" title="To Do" children={<Taskcard status="todo" />} />
            <DroppableContainer droppableId="inprogress" title="In Progress" children={<Taskcard status="inprogress" />} />
            <DroppableContainer droppableId="review" title="Peer Review" children={<Taskcard status="review" />} />
            <DroppableContainer droppableId="done" title="Done" children={<Taskcard status="done" />} />
          </div>
        </div>
      </div>
    </DragDropContext>
  );
};

export default Home;
