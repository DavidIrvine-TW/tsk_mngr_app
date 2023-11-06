import { createSlice } from "@reduxjs/toolkit";
import modifiedData from "../data/modifiedData";
import { v4 as uuidv4 } from "uuid";

const getLocalStorageData = () => {
  const modifiedData = localStorage.getItem("Kanban");
  return modifiedData ? JSON.parse(modifiedData) : modifiedData;
};

const boardsSlice = createSlice({
  name: "boards",

  initialState: getLocalStorageData() || modifiedData.boards,

  reducers: {
    setSubtaskCompleted: (state, action) => {
      const { subtaskId } = action.payload;
      return state.map((board) => {
        if (board.isActive) {
          const updatedColumns = board.columns.map((col) => {
            const updatedTasks = col.tasks.map((task) => {
              const updatedSubtasks = task.subtasks.map((subtask) => {
                if (subtask.subtask_id === subtaskId) {
                  return { ...subtask, isCompleted: !subtask.isCompleted };
                }
                return subtask;
              });
              return { ...task, subtasks: updatedSubtasks };
            });
            return { ...col, tasks: updatedTasks };
          });
          return { ...board, columns: updatedColumns };
        }
        return board;
      });
    },

    deleteTask: (state, action) => {
      const { columnIndex, taskIndex } = action.payload;
      return state.map((board) => {
        if (board.isActive) {
          const updatedColumns = board.columns.map((col, i) => {
            if (i === columnIndex) {
              const updatedTasks = col.tasks.filter(
                (task, j) => j !== taskIndex
              );
              return { ...col, tasks: updatedTasks };
            }
            return col;
          });
          return { ...board, columns: updatedColumns };
        }
        return board;
      });
    },

    addTask: (state, action) => {
      const {
        taskTitle,
        status,
        taskDescription,
        subtasks,
        statusIndex,
        taskId,
      } = action.payload;
      console.log(statusIndex);
      return state.map((board) => {
        if (board.isActive) {
          const updatedColumns = board.columns.map((col, i) => {
            if (i === statusIndex) {
              const updatedTasks = [
                ...col.tasks,
                {
                  task_id: taskId,
                  title: taskTitle,
                  description: taskDescription,
                  subtasks: subtasks,
                  status: status,
                },
              ];
              return { ...col, tasks: updatedTasks };
            }
            return col;
          });
          return { ...board, columns: updatedColumns };
        }
        return board;
      });
    },

    editTask: (state, action) => {
      const {
        taskTitle,
        status,
        taskDescription,
        subtasks,
        columnIndex,
        statusIndex,
        taskIndex,
      } = action.payload;
      return state.map((board) => {
        if (board.isActive) {
          const updatedColumns = board.columns.map((col, i) => {
            if (i === columnIndex) {
              const updatedTasks = col.tasks.map((task, j) => {
                if (j === taskIndex) {
                  return {
                    ...task,
                    title: taskTitle,
                    status: status,
                    description: taskDescription,
                    subtasks: subtasks,
                  };
                }
                return task;
              });
              return { ...col, tasks: updatedTasks };
            }
            return col;
          });
          if (columnIndex === statusIndex)
            return { ...board, columns: updatedColumns };
          const newColumns = board.columns.map((col, i) => {
            if (i === statusIndex) {
              const updatedTasks = [
                ...col.tasks,
                updatedColumns[columnIndex].tasks[taskIndex],
              ];
              return { ...col, tasks: updatedTasks };
            }
            return col;
          });
          return { ...board, columns: newColumns };
        }
        return board;
      });
    },

    dragTask: (state, action) => {
      const { newBoardId, newBoard } = action.payload;

      const updatedState = state.map((board) => {
        if (board.board_id === newBoardId) {
          return newBoard;
        }
        return board;
      });

      return updatedState;
    },

    editBoard: (state, action) => {
      const { boardName, createdColumns } = action.payload;
      return state.map((board) => {
        if (board.isActive) {
          return { ...board, name: boardName, columns: createdColumns };
        }
        return board;
      });
    },

    deleteBoard: (state) => {
      const deletedBoardIndex = state.findIndex((board) => board.isActive);
      if (deletedBoardIndex !== -1) {
        const newState = [...state];
        newState.splice(deletedBoardIndex, 1);
        return newState;
      } else {
        return state;
      }
    },

    setBoardActive: (state, action) => {
      state.map((board, index) => {
        index === action.payload.index
          ? (board.isActive = true)
          : (board.isActive = false);
        return board;
      });
    },

    setTaskStatus: (state, action) => {
      const { columnIndex, newIndex, taskIndex, currentStatus } =
        action.payload;

      const newState = state.map((board) => {
        if (board.isActive) {
          const newColumns = board.columns.map((column, index) => {
            if (index === columnIndex) {
              const newTasks = column.tasks.filter(
                (t, index) => index !== taskIndex
              );
              return { ...column, tasks: newTasks };
            } else if (index === newIndex) {
              const task = board.columns[columnIndex].tasks.find(
                (t, index) => index === taskIndex
              );
              const newTasks = [
                ...column.tasks,
                { ...task, status: currentStatus },
              ];
              return { ...column, tasks: newTasks };
            } else {
              return column;
            }
          });
          return { ...board, columns: newColumns };
        } else {
          return board;
        }
      });
      return newState;
    },

    addBoard: (state, action) => {
      const isActive = state.length > 0 ? false : true; // if no boards, initial board is active
      const { boardName, createdColumns } = action.payload;
      const board = {
        name: boardName,
        isActive,
        columns: createdColumns,
        board_id: uuidv4(),
      };

      return [...state, board];
    },
  },
});

export default boardsSlice;
