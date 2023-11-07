import AddBoardModal from "./AddBoardModal";
import AddEditTaskModal from "./AddEditTaskModal";
import BoardsMenuModal from "./BoardsMenuModal";
import DeleteBoardModal from "./DeleteBoardModal";
import DeleteEditMenuModal from "./DeleteEditMenuModal";
import DeleteEditTaskModal from "./DeleteEditTaskModal";
import TaskModal from "./TaskModal";
import { useSelector } from "react-redux";

const AllModals = () => {
  const grabModal = useSelector((state) => state.modal);

  return (
    <>
      {grabModal.type === "createBoard" && (
        <AddBoardModal {...grabModal} type="add" />
      )}

      {grabModal.type === "editBoard" && (
        <AddBoardModal {...grabModal} type="edit" />
      )}

      {grabModal.type === "addNew" && (
        <AddEditTaskModal {...grabModal} type="add" />
      )}

      {grabModal.type === "editTask" && (
        <AddEditTaskModal {...grabModal} type="edit" />
      )}

      {grabModal.type === "mobileMenu" && (
        <BoardsMenuModal {...grabModal} type="" />
      )}

      {grabModal.type === "deleteBoard" && (
        <DeleteBoardModal {...grabModal} type="board" />
      )}

      {grabModal.type === "deleteTask" && (
        <DeleteBoardModal {...grabModal} type="task" />
      )}

      {grabModal.type === "deleteEditMenu" && (
        <DeleteEditMenuModal {...grabModal} />
      )}

      {grabModal.type === "deleteEditTask" && (
        <DeleteEditTaskModal {...grabModal} />
      )}

      {grabModal.type === "task" && (
        <TaskModal {...grabModal} />)}
    </>
  );
};

export default AllModals;
