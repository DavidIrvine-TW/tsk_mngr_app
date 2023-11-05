import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import KanbanBoard from './components/kanbanBoard/KanbanBoard'
import Nav from "./components/navstuff/Nav";
import AllModals from './components/modals/Allmodals'




function App() {

  const dispatch = useDispatch();

  const boards = useSelector((state) => state.boards);
  const board = boards.find((board) => board.isActive === true);
  if (!board && boards.length > 0)
    dispatch(boardsSlice.actions.setBoardActive({ index: 0 })); // ensure always an active board

  const [allData, setAllData] = useState(boards);
  const [data, setData] = useState(board);
 
  useEffect(() => {
    setAllData(boards)
    setData(board);
  }, [board, boards]);
  

  return (
    <div  
      style={{ height: "100vh", width: "100vw" }}
      id="wrapper"
      className="relative mx-auto font-roboto overflow-y-hidden dark:bg-darkbackground ">

      <Nav allData={allData} data={data}/>
      <AllModals/>
      <KanbanBoard data={data} setData={setData} allData={allData}/>
         
    </div>
  );
}

export default App;