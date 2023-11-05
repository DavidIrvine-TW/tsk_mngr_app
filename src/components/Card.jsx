import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {modalIsOpen} from '../redux/modalSlice'

const Card = ({ columnIndex, taskIndex, provided, taskData }) => {

  const dispatch = useDispatch()
  
  const completedSubtasks = taskData?.subtasks.filter((subtask) => subtask.isCompleted);

  const handleTaskCardClick = () => {
    dispatch(modalIsOpen({type: "task", modalDetail: {taskData: taskData, columnIndex: columnIndex, taskIndex: taskIndex}}))
  };




  return (
    <div
      ref={provided.innerRef}
      {...provided.draggableProps}
      {...provided.dragHandleProps}
    >
      <div className="card Taskcard" onClick={handleTaskCardClick}>
        <p className="font-bold">{taskData?.title}</p>

        <p className="Taskcard__subtasks-txt">
          {completedSubtasks?.length} of {taskData?.subtasks.length} subtasks
        </p>
      </div>
    </div>
  );
};

export default Card;
