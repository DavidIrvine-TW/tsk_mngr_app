import React from "react";
import boardsSlice from "../../redux/boardsSlice";
import { useDispatch, useSelector } from "react-redux";
import { modalIsClosed, modalIsOpen } from "../../redux/modalSlice";

const DeleteBoardModal = ({
  type,
  modalDetail,
}) => {

  const dispatch = useDispatch();
  const board = useSelector((state) => state.boards).find(
    (board) => board.isActive
  );
  const columns = board.columns;
  const column = columns.find((col, index) => index === modalDetail.columnIndex);
  const task = column ? column.tasks.find((task, index) => index === modalDetail.taskIndex) : []

  const deleteBoardHandler = (e) => {
    if (type === "board") {
      dispatch(boardsSlice.actions.deleteBoard());
      dispatch(boardsSlice.actions.setBoardActive({ index: 0 }));
      dispatch(modalIsClosed({type: ""}));
    } else if (type == "task") {
      dispatch(boardsSlice.actions.deleteTask({ taskIndex: modalDetail.taskIndex, columnIndex: modalDetail.columnIndex }));
      dispatch(modalIsClosed({type: ""}));
    }
  };

  return (
    <section
      id="delete-board-modal"
      className="fade-in absolute top-0 right-0 left-0 bottom-0 bg-zinc-500 
        bg-opacity-30 dark:bg-darkbackground dark:bg-opacity-80 z-20 flex items-center justify-center shadow-md"

      onClick={(e) => {
        if (e.target !== e.currentTarget) {
          return;
        }
        dispatch(modalIsClosed({type: ""}));
      }}
    >
      <article className=" w-[345px] tb:w-[480px] rounded bg-white dark:bg-drkbackground-950 shadow-md p-6">
       
        <p className="mb-[1.5rem] text-lghtprimary font-bold text-l ">
          {type === "board"
            ?  `Delete ${board.name}?`
            : `Delete ${task.title}?`}
        </p>

        <p className="mb-[1.5rem] text-body-l dark:text-gray-500">
          {type === "board"
            ? `Are you sure you want to delete the ‘${board.name}’ board? This action will remove all columns and tasks and cannot be reversed.`
            : `Are you sure you want to delete the ‘${task.title}’ task and its subtasks? This action cannot be reversed.`}
        </p>

        <div className="flex flex-col  w-full gap-[1rem]">
          <button
            onClick={deleteBoardHandler}
            className="border py-2 rounded bg-lghtprimary hover:bg-primary-400 text-darktext font-bold shadow-md dark:border-darksecondary"
          >
            {type === "board" ? 'Delete Board' : 'Delete Task'}   
          </button>

          <button
            onClick={() => dispatch(modalIsClosed({type: ""}))}
            className="py-2 rounded hover:underline dark:text-darktext"
          >
            Cancel
          </button>
        </div>
      </article>
    </section>
  );
};

export default DeleteBoardModal;
