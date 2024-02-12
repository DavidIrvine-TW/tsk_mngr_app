import { useDispatch } from "react-redux";
import { modalIsClosed, modalIsOpen } from "../../redux/modalslice";

const DeleteEditMenuModal = ({
  taskData,
  columnIndex,
  taskIndex,
}) => {
  const dispatch = useDispatch();

  return (
    <article
      id="dropdown-delete-edit-task"
      className="absolute top-[2rem] right-[0rem] p-4 flex flex-col 
        gap-[1rem] items-start border rounded z-50 bg-lghtbackground dark:bg-drkbackground-950 
        dark:border-darksecondary shadow-md"
    >
      <div className="flex flex-col gap-[1rem]">

        <button
          onClick={() => {
            dispatch(modalIsClosed({ type: "" }));
            dispatch(
              modalIsOpen({
                type: "editTask",
                modalDetail: {
                  taskData: taskData,
                  columnIndex: columnIndex,
                  taskIndex: taskIndex,
                },
              })
            );
          }}
          className="font-bold w-[150px] py-1 px-2 text-left hover:underline dark:text-darktext"
        >
          Edit Task
        </button>

        <button
          onClick={() => {
            dispatch(modalIsClosed({ type: "" }));
            dispatch(
              modalIsOpen({
                type: "deleteTask",
                modalDetail: {
                  taskData: taskData,
                  columnIndex: columnIndex,
                  taskIndex: taskIndex,
                },
              })
            );
          }}
          className="text-lghtprimary font-bold w-[150px] py-1 px-2 text-left hover:underline"
        >
          Delete Task
        </button>
        
      </div>
    </article>
  );
};

export default DeleteEditMenuModal;
