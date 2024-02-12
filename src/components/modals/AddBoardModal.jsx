import React, { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import DeleteForeverOutlinedIcon from "@mui/icons-material/DeleteForeverOutlined";
import { useDispatch, useSelector } from "react-redux";
import AddIcon from "@mui/icons-material/Add";
import boardsSlice from "../../redux/boardsSlice";
import CloseIcon from "@mui/icons-material/Close";
import { modalIsClosed } from "../../redux/modalslice";

const AddEditBoardModal = ({ type, modalDetail }) => {
  
  const dispatch = useDispatch();

  const [boardName, setBoardName] = useState("");
  const [boardNameError, setBoardNameError] = useState("");
  const [createdColumnsError, setCreatedColumnError] = useState("");
  const [isDisabled, setIsDisabled] = useState(false);

  const [createdColumns, setCreatedColumns] = useState([
    {
      name: "",
      tasks: [],
      column_id: uuidv4(),
    },
  ]);
  const boards = useSelector((state) => state.boards)
  const board = useSelector((state) => state.boards).find(
    (board) => board.isActive
  );

  useEffect(() => {
    if (type === "edit" || modalDetail.type === "edit") {
      setCreatedColumns(
        board.columns.map((col) => {
          return { ...col};
        })
      );
      setBoardName(board.name);
    }
  }, [type])

  

  const onChange = (id, newValue) => {
    setCreatedColumns((prevState) => {
      const newState = [...prevState];
      const column = newState.find((col) => col.column_id === id);
      column.name = newValue;
      return newState;
    });
  };

  const onDelete = (id) => {
    setCreatedColumns((prevState) => prevState.filter((col) => col.column_id !== id));
    setIsDisabled(false);
  };

  const formValidate = async () => {

    setCreatedColumnError("");
    setBoardNameError("");

    if (!boardName.trim()) {
      setBoardNameError("Required");
      return false;
    }

    const columnValidationPromises = createdColumns.map(async (column) => {
      if (!column.name.trim()) {
        setCreatedColumnError("Required");
        return false;
      }
    }); 
    
    const columnValidationResults = await Promise.all(columnValidationPromises);
    if (columnValidationResults.includes(false)) {
      return false;
    }
    return true;

  };

  const onSubmit = async (e) => {

    e.preventDefault();

    const isFormValid = await formValidate();
    
    if (isFormValid) {
      if (type === "add") {
        const index = boards.length + 1
        dispatch(boardsSlice.actions.addBoard({ boardName, createdColumns, index }));   
       
      } else if (type === "edit") {
        dispatch(boardsSlice.actions.editBoard({ boardName, createdColumns }));
      }
        dispatch(modalIsClosed({type: ""}));
    }
  };


  
  return (

    <section
      id="add-board-modal"
      className="Modal"
      onClick={(e) => {
        if (e.target !== e.currentTarget) {
          return;
        }
        dispatch(modalIsClosed({type: ''}));
      }}
    >
      <form
        className="Modal__form"
        onSubmit={onSubmit}
      >

        <div 
          className="Modal__form-head">
          <h3 
            className="text-l">
            {type === "edit" ? "Edit" : "Add New"} Board
          </h3>

          <button
            className="Modal__form-close-btn Modal__focus"
            onClick={() =>  
              dispatch(modalIsClosed({type: ''}))
            }
          >
            <CloseIcon />
          </button>
        </div>

        <div 
          className="flex flex-col mb-[1.5rem]">

          <label 
            className="Modal__formfield-label">
              Board Name*
          </label>

          <div className="border rounded"> 

            <input
              onChange={(e) => setBoardName(e.target.value)}
              value={boardName}
              className="Modal__form-input Modal__focus"
              placeholder="eg. web design"
              id="board-name-input"
            />
            
          </div>

          <span 
            className="Modal__form-error">
            {boardNameError}
          </span>

        </div>



        <div>
          <div>
            <label 
              className="Modal__formfield-label">Board Columns*</label>

            {createdColumns.map((column, index) => {
              return (
                <div
                  className="flex gap-[1rem] items-center w-full mt-[.5rem] "
                  key={index}
                >
                  <div className="border flex-grow rounded">
                  <input
                    className="Modal__form-input Modal__focus"
                    onChange={(e) => {
                      onChange(column.column_id, e.target.value);
                    }}
                    type="text"
                    value={column.name}
                    placeholder="e.g. Todo"
                  />
                  </div>
                  <button
                    onClick={() => onDelete(column.column_id)}
                    className="cursor-pointer Modal__focus"
                  >
                    <DeleteForeverOutlinedIcon fontSize="medium" className="Modal__delete "/>
                  </button>
                </div>
              );
            })}

            <span 
              className="Modal__form-error ">
              {createdColumnsError}
            </span>

          </div>

          {isDisabled ? (
            <span 
              className="Modal__form-error">Max columns (5)</span>
          ) : (
            ""
          )}


          <div 
            className="flex flex-col gap-[1.5rem] mt-[1.5rem]">

            <button
              type="button"
              className="Modal__btn-secondary Modal__btn Modal__focus"
              disabled={isDisabled}
              onClick={() => {
                if (createdColumns.length > 4) {
                  setIsDisabled(true);
                  return;
                }
                setCreatedColumns((state) => [
                  ...state,
                  { name: "", tasks: [], column_id: uuidv4() },
                ]);
                setIsDisabled(false);
              }}
            >
              <AddIcon sx={{ fontSize: ".75rem" }} />
              New Column
            </button>

            <button
              className="Modal__btn-primary Modal__btn Modal__focus"
              onClick={(e) => {
                onSubmit(e);
              }}
              type="submit"
            >
              {" "}
              {type === "add" ? "Create Board" : "Update"}
            </button>

          </div>


        </div>
      </form>
    </section>
  );
};

export default AddEditBoardModal;
