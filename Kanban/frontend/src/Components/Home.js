import React, { useState, useEffect} from "react";
import { DragDropContext, Droppable} from "react-beautiful-dnd";
import Taskcard from "./Taskcard";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";
import Navbar from "../Navbar";


const Home = () => {
  const [search, setSearch] = useState("");
  const [tasks, setTasks] = useState([]);
  const [progress, setProgress] = useState([]);
  const [review, setReview] = useState([]);
  const [done, setDone] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:9000/tasks")
      .then((res) => {
        setTasks(res.data);
      })
      .catch((error) => {
        console.error(error.code);
      });
  }, []);


  const deleteHandler = (id) => {
    try {
      axios.delete("http://localhost:9000/tasks/" + id);
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };

  //Defining onDragEnd function so that when drag operation completes it starts excution
  const handleOnDragEnd = (result) => {
    const { destination, source, draggableId } = result;
    const taskId = parseInt(draggableId, 10);
  
    if (!destination) return;

 const sortedColumn =(comp,setter)=>{
  
    // Reorder tasks within the same column
    const items = [...comp];
    const [reorderedItem] = items.splice(source.index, 1);
    items.splice(destination.index, 0, reorderedItem);
    setter(items); 

}
    if (destination.droppableId === source.droppableId) {
      // Reorder tasks within the same column
      sortedColumn(tasks,setTasks)
      sortedColumn(progress,setProgress)
      sortedColumn(review,setReview)
      sortedColumn(done,setDone)
    } else {
      // Arranging Tasks Across the columns.
      const taskToMove = findTask(taskId, tasks, review, done, progress);
      if (taskToMove) {
        switch (source.droppableId) {
          case "todo":
            setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId));
            break;
          case "review":
            setReview((prevReview) => prevReview.filter((task) => task.id !== taskId));
            break;
          case "done":
            setDone((prevDone) => prevDone.filter((task) => task.id !== taskId));
            break;
          case "inprogress":
            setProgress((prevInProgress) => prevInProgress.filter((task) => task.id !== taskId));
            break;
        }
  
        switch (destination.droppableId) {
          case "inprogress":
            setProgress((prevInProgress) => [...prevInProgress, taskToMove]);
            break;
          case "done":
            setDone((prevDone) => [...prevDone, taskToMove]);
            break;
          case "review":
            setReview((prevReview) => [...prevReview, taskToMove]);
            break;
          case "todo":
            setTasks((prevTodo) => [...prevTodo, taskToMove]);
            break;
        }
      }
    }
  };
  
  const findTask = (taskId, ...arrays) => {
    for (const array of arrays) {
      const task = array.find((task) => task.id === taskId);
      if (task) return task;
    }
    return null;
  };

  // tasks filtered by search input
  const Filteredtasks=(Tasks) => Tasks
    .filter((task) => task.title.toLowerCase().includes(search.toLowerCase()))
    .map((task) => (
      <ul
        id="taskcard"
        key={task.id}
        className="border border-black border-2 fs-5 m-2"
      >
        <li id="title">{task.title}</li>
        <li id="descp">{task.description}</li>
        <button id="delete-btn" onClick={() => deleteHandler(task.id)}>
          <FontAwesomeIcon icon={faTrashCan} />
        </button>
      </ul>
    ));

//defining droppable Task container
  const DroppableContainer = ({ droppableId, title, children }) => (
    <Droppable droppableId={droppableId}>
      {(provided) => (
        <div
          id="container"
          ref={provided.innerRef}
          {...provided.droppableProps}
          className="d-flex m-2"
        >
          <h1>{title}</h1>
          <div>{children}</div>
          {provided.placeholder}
        </div>
      )}
    </Droppable>
  );

  return (
    <DragDropContext onDragEnd={handleOnDragEnd}>
      <div className="App">

       <Navbar setSearch={setSearch}/>

        <div className="w-100vw">
          {search ? (
            <div className="d-flex">
              <DroppableContainer droppableId="todo" title="TO DO"
                children={Filteredtasks(tasks)}
              />
              <DroppableContainer droppableId="inprogress" title="In Progress"
                children={Filteredtasks(progress)}
              />
              <DroppableContainer droppableId="review" title="Peer Review"
              children={Filteredtasks(review)} />

              <DroppableContainer droppableId="done" title="Done" 
              children={Filteredtasks(done)}/>
            </div>
          ) : (
            <div className="d-flex">
              <DroppableContainer droppableId="todo" title="To Do"
                children={<Taskcard tasks={tasks} deleteHandler={deleteHandler} />}
              />
              <DroppableContainer droppableId="inprogress" title="In Progress"
                children={<Taskcard tasks={progress} deleteHandler={deleteHandler} />}
              />
              <DroppableContainer droppableId="review" title="Peer Review"
                children={<Taskcard tasks={review} deleteHandler={deleteHandler}/>}
              />
              <DroppableContainer droppableId="done" title="Done"
                children={<Taskcard tasks={done} deleteHandler={deleteHandler} />}
              />
            </div>
          )}
        </div>
      </div>
    </DragDropContext>
  );
};

export default Home;
