import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import boardsSlice from '../redux/boardsSlice';

const Subtask = ({subtaskIndex, columnIndex, taskIndex}) => {

    const dispatch = useDispatch();
  
    const boards = useSelector((state) => state.boards);
    const board = boards.find((board) => board.isActive === true);
    const col = board.columns.find((col, i) => i === columnIndex);
    const task = col.tasks.find((task, i) => i === taskIndex);
    const subtask = task.subtasks.find((subtask, i) => i === subtaskIndex)
    const checked = subtask.isCompleted;

    
    const onChange = (id) => {
      dispatch(
        boardsSlice.actions.setSubtaskCompleted({subtaskId: id})
      );
    };


  return (
    <div className="Subtask">
      <input
        className=" w-4 h-4 cursor-pointer "
        type="checkbox"
        checked={checked}
        onChange={() => {onChange(subtask.subtask_id)}}
      />
      <p 
      className={checked ? "line-through opacity-30 text-body-md " : "text-body-md"}
      >
      {subtask.title}
      </p>
    </div>
  )
}

export default Subtask