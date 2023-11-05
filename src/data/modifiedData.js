import { v4 as uuidv4 } from "uuid";
import initialData from './data.json';

const addUniqueIds = (data) => {
  data.boards.forEach((board) => {
    board.board_id = uuidv4(); 
    board.columns.forEach((column) => {
      column.column_id = uuidv4(); 
      column.tasks.forEach((task) => {
        task.task_id = uuidv4();
        task.subtasks.forEach((subtask) => {
          subtask.subtask_id = uuidv4();
        });
      });
    });
  });
  return data; 
};

const modifiedData = addUniqueIds(initialData); 
export default modifiedData;
