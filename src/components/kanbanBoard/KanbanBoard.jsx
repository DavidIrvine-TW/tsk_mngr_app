import React, { useState } from "react";
import Column from "../Column";
import ScrollContainer from "react-indiana-drag-scroll";
import { DragDropContext } from "@hello-pangea/dnd";
import { useDispatch } from "react-redux";
import AddIcon from "@mui/icons-material/Add";
import Sidebar from "../navstuff/SideNav";
import { modalIsOpen } from "../../redux/modalSlice";
import EmptyBoard from "../emptyboard/EmptyBoard";
import boardsSlice from "../../redux/boardsSlice";

const KanbanBoard = ({ data, setData, allData }) => {

  const [sideNavOpen, setSideNavOpen] = useState(true);
  const dispatch = useDispatch();


 const onDragEnd = (result) => {
    const { destination, source } = result;
 
    // no destination
    if (!destination) {
      return;
    }

    // same column, same index
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    const sourceColumn = data?.columns.find(
      (column) => column.column_id === source.droppableId
    );

    const destinationColumn = data?.columns.find(
      (column) => column.column_id === destination.droppableId
    );

    const sourceTasks = Array.from(sourceColumn.tasks);
    const [draggedTask] = sourceTasks.splice(source.index, 1);

    if (sourceColumn.column_id === destinationColumn.column_id) {
      sourceTasks.splice(destination.index, 0, draggedTask);

      const newColumn = {
        ...sourceColumn,
        tasks: sourceTasks,
      };

      const newColumns = data.columns.map((column) =>
        column.column_id === newColumn.column_id ? newColumn : column
      );

      const newBoard = {
        ...data,
        columns: newColumns,
      };

      dispatch(
        boardsSlice.actions.dragTask({
          newBoardId: newBoard.board_id,
          newBoard: newBoard,
        })
      );

      setData(newBoard);
      return;
    }

    //diff column
    const destinationTasks = Array.from(destinationColumn.tasks);
    destinationTasks.splice(destination.index, 0, draggedTask);

    const newSourceColumn = {
      ...sourceColumn,
      tasks: sourceTasks,
    };

    const newDestinationColumn = {
      ...destinationColumn,
      tasks: destinationTasks,
    };

    const updatedColumns = data.columns.map((column) => {
      if (column.column_id === newSourceColumn.column_id) {
        return newSourceColumn;
      }
      if (column.column_id === newDestinationColumn.column_id) {
        return newDestinationColumn;
      }
      return column;
    });

    const newBoard = {
      ...data,
      columns: updatedColumns,
    };

    dispatch(
      boardsSlice.actions.dragTask({
        newBoardId: newBoard.board_id,
        newBoard: newBoard,
      })
    );

    setData(newBoard);
  };

  return (
    <ScrollContainer
      nativeMobileScroll={true}
      vertical={false}
      hideScrollbars={false}
      ignoreElements={".card"}
      className="Main flex w-screen overflow-auto relative"
    >
      {/* side menu */}
      <Sidebar
        data={data}
        allData={allData}
        sideNavOpen={sideNavOpen}
        setSideNavOpen={setSideNavOpen}
      />

      <main
        className={`tb:absolute static transition-all duration-500 p-[1rem] dk:p-[1.5rem] cursor-move flex w-full h-screen bg-lghtbackground dark:bg-darkbackground
          ${
            sideNavOpen
              ? "dk:left-[18.75rem] tb:left-[16.25rem] transition-all duration-500 "
              : "left-[0]"
          }`}
      >
        {allData.length < 1 ? (
          <EmptyBoard />
        ) : (
          <DragDropContext onDragEnd={onDragEnd}>
            <div
              style={{
                display: "flex",
                // gap: "1rem",
                // border: "2px dashed orange",
              }}
            >
              {data.columns.map((column, index) => (
                <Column 
                  key={column.column_id} 
                  column={column} 
                  columnIndex={index}
                  />
              ))}

              {data.columns.length > 4 ? (
                ""
              ) : (
                <div
                  className=" h-screen flex justify-center items-center font-bold  transition duration-300 cursor-pointer w-[280px] 
                  rounded border-dashed border-2 dark:border-darksecondary "
                >
                  <button
                    className="bg-lghtsecondary px-4 py-2 shadow-md dark:bg-drksecondary-800  hover:dark:bg-drksecondary-900"
                    onClick={() => {
                      dispatch(
                        modalIsOpen({
                          type: "editBoard",
                          modalDetail: { type: "edit" },
                        })
                      );
                    }}
                  >
                    <AddIcon fontSize="small" /> New Column
                  </button>
                </div>
              )}
            </div>
          </DragDropContext>
        )}
      </main>
    </ScrollContainer>
  );
};

export default KanbanBoard;
