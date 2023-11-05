import React from 'react'
import AddIcon from "@mui/icons-material/Add";

const EmptyBoard = ({setBoardMenu, setBoardMode, setCreateBoardMenu}) => {
  return (
    <section className='w-full flex items-start '>
      <article className='flex flex-col text-center' >
        <p>There are no boards. You must create a new board to get things started...</p>

        <button
          // onClick={() => {
          //   setBoardMenu(false)
          //   setBoardMode('add')
          //   setCreateBoardMenu(true)}}
          className="text-md mt-[2rem] tb:hidden"
        >
          <AddIcon sx={{ fontSize: ".75rem" }} />
          Create New Board
        </button>


      </article> 
    </section>
  )
}

export default EmptyBoard