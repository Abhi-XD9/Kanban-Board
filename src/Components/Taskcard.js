import React from 'react';
import { Draggable } from 'react-beautiful-dnd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { useTasks } from './Context';

const Taskcard = ({ status }) => {
  const { getFilteredTasks, deleteTask} = useTasks();
  const tasks = getFilteredTasks(status);

  if (!tasks) return null;

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
                <button id="delete-btn" onClick={() => { deleteTask(task.id)}}>
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
