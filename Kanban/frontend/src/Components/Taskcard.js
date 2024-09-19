import { Draggable } from 'react-beautiful-dnd';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashCan } from '@fortawesome/free-solid-svg-icons';

const Taskcard = ({ tasks,deleteHandler }) => {
  if (!tasks) return null;

//   const deleteHandler = (id)=>{
//     try {
//         axios.delete('http://localhost:9000/tasks/'+id)
//         // window.location.reload()
//         setTasks(tasks.filter(task => task.id !== id));
//     } catch (error) {
//         console.log(error)
//     }
// }


  return (
    <div>
      {tasks.map((task, index) => {
        if (!task) return null;

        return (
          <Draggable
            key={task.id}
            draggableId={task.id.toString()}
            index={index}
          >
            {(provided) => (
              <ul
                id="taskcard"
                ref={provided.innerRef}
                {...provided.draggableProps}
                {...provided.dragHandleProps}
                key={task.id}
                className="fs-5 m-2"
              >
                <li id="title">{task.title}</li>
                <li id="descp">{task.description}</li>
                <button id="delete-btn" onClick={() => deleteHandler(task.id)}>
                  <FontAwesomeIcon icon={faTrashCan} />
                </button>
              </ul>
            )}
          </Draggable>
        );
      })}
    </div>
  );
};

export default Taskcard;