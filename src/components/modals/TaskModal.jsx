import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import MoreVertTwoToneIcon from "@mui/icons-material/MoreVertTwoTone";
import DeleteEditTaskModal from "./DeleteEditTaskModal";
import Subtask from "../Subtask"
import boardsSlice from "../../redux/boardsSlice";
import { modalIsClosed } from "../../redux/modalslice";

const TaskModal = ({ modalDetail }) => {
 
  const dispatch = useDispatch();

  const boards = useSelector((state) => state.boards);
  const board = boards.find((board) => board.isActive === true);
  const columns = board.columns;
  const column = columns.find((column, index) => index === modalDetail.columnIndex);
  const task = column.tasks.find((task, index) => index === modalDetail.taskIndex);
  const subtasks = task.subtasks;
  const completedSubtasks = subtasks.filter((subtask) => subtask.isCompleted);

  const [ellipsesMenu, setElippsesMenu] = useState(false);
  const [currentStatus, setStatus] = useState(task.status);
  const [newIndex, setNewStatusIndex] = useState(columns.indexOf(column));
  const [isDisabled, setIsDisabled] = useState(true)

  const onSubmitHandler = (e) => {
    e.preventDefault();
    dispatch(
      boardsSlice.actions.setTaskStatus({
        taskIndex: modalDetail.taskIndex,
        columnIndex: modalDetail.columnIndex,
        newIndex: newIndex,
        currentStatus: currentStatus,
      })
    );
    dispatch(modalIsClosed({type: ""}))
  };

  const statusHandler = (e) => {
    setStatus(e.target.value);
    setNewStatusIndex(e.target.selectedIndex);
    setIsDisabled(false); 
  };

  return (
    <section
      id="task-modal"
      className="fade-in absolute top-0 right-0 left-0 bottom-0 bg-zinc-500 bg-opacity-50 dark:bg-darkbackground 
      dark:bg-opacity-80 flex items-center justify-center cursor-default z-20"
      onClick={(e) => {
        if (e.target !== e.currentTarget) {
          return;
        }
        dispatch(modalIsClosed({type: ""}))
      }}
    >
      <article className="bg-lghtbackground dark:bg-drkbackground-950 shadow-md p-[2rem] rounded tb:w-[480px]">
        <div className="relative flex justify-between items-center dark:text-drksecondary-700">
          <h1>{task.title}</h1>
          <button
            onClick={(e) => {
              setElippsesMenu(!ellipsesMenu);
            }}
          >
            <MoreVertTwoToneIcon
              sx={{ fontSize: "2rem" }}
              className="text-lghttext dark:text-gray-500 hover:dark:text-darktext"
            />
          </button>

          {ellipsesMenu ? (
            <DeleteEditTaskModal
              setElippsesMenu={setElippsesMenu}
              taskIndex={modalDetail.taskIndex}
              columnIndex={modalDetail.columnIndex}
              taskData={modalDetail}
            />
          ) : (
            ""
          )}
        </div>

        <p className="text-gray-500 font-[600] tracking-wide text-xs pt-6">
          {task.description ? task.description : "No description"}
        </p>

        <p className=" pt-6 text-gray-500 tracking-widest text-sm">
          Subtasks ({completedSubtasks.length} of {subtasks.length})
        </p>

        <div className=" mt-3 space-y-2">
          {subtasks.map((subtask, index) => {
            return (
              <Subtask
                subtaskIndex={index}
                taskIndex={modalDetail.taskIndex}
                columnIndex={modalDetail.columnIndex}
                key={subtasks.subtask_id}
              />
            );
          })}
        </div>

        <div className="flex flex-col mt-[1.5rem]">
          <label className="text-body-l mb-[.5rem] font-bold dark:text-gray-500">
            Task Status
          </label>

          <select
            onChange={statusHandler}
            value={currentStatus}
            className="text-body-md border py-2 px-4 rounded dark:bg-drkbackground-100"
          >
            {columns.map((column, index) => (
              <option key={index}>{column.name}</option>
            ))}
          </select>
        </div>


        <div>
          <button
            className={isDisabled ? "Modal__btn-primary-disabled" : ' Modal__btn-primary'}                
            onClick={onSubmitHandler}
            type="submit"
            disabled={isDisabled}
          >
            {" "}
            Update Task Status
          </button>
        </div>
      </article>
    </section>
  );
};

export default TaskModal;
