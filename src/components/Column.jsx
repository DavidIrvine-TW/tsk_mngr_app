import React, { useState, useEffect } from "react";
import Card from './Card';
import { Droppable, Draggable } from '@hello-pangea/dnd';

const Column = ({ column, columnIndex }) => {

  const colors = [
    "bg-purple-400",
    "bg-blue-400",
    "bg-green-400",
    "bg-pink-400",
    "bg-indigo-400",
    "bg-yellow-400",
    "bg-orange-400",
    "bg-sky-400",
    "bg-red-400",
  ];

  const [randomColor, setRandomColor] = useState("");
  
  const getRandomColor = () => {
    const randomIndex = Math.floor(Math.random() * colors.length);
    return colors[randomIndex];
  };
  useEffect(() => {
    const color = getRandomColor();
    setRandomColor(color);
  }, []);


  return (
    <div 
      className={`Column ${column.tasks.length === 0 ? "Column__empty": ""}`}
    >
      <div className="Column__cont-title">
        <div className={`Column__ball ${randomColor}`} />
        <p className="Column__title">
          {column.name} ({column.tasks.length})
        </p>
      </div>

      <Droppable droppableId={column.column_id}>
        {(droppableProvided, droppableSnapshot) => (
          <div
            className="Column__cont-droppable h-screen "
            // style={{ border: '1px solid red', width: '200px', height: '100%' }}
            ref={droppableProvided.innerRef}
            {...droppableProvided.droppableProps}
          >
            <span style={{ display: 'none' }}>{droppableProvided.placeholder}</span>
            {column.tasks.map((task, index) => (
              <Draggable key={task.task_id} draggableId={task.task_id} index={index}>
                {(draggableProvided, draggableSnapshot) => 
                  <Card 
                    taskData={task} 
                    provided={draggableProvided}
                    taskIndex={index}
                    columnIndex={columnIndex} />}
              </Draggable>
            ))}
          </div>
        )}
      </Droppable>
    </div>
  );
};

export default Column;
