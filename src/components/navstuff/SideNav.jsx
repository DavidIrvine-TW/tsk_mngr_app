import React from "react";
import BoardIcon from '../icons/BoardIcon'
import AddIcon from "@mui/icons-material/Add";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import DrkMdSwitch from "../switch/DrkMdSwitch"
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import useToggle from "../../hooks/useToggle";
import boardsSlice from "../../redux/boardsSlice";
import { modalIsOpen } from "../../redux/modalSlice";

const SideNav = ({ setSideNavOpen, sideNavOpen, allData, data }) => {
  
  const [isDarkTheme, toggleMode] = useToggle(
    localStorage.getItem("theme-color") === "dark"
  );

  useEffect(() => {
    document.documentElement.className = isDarkTheme ? "dark" : "";
    localStorage.setItem("theme-color", isDarkTheme ? "dark" : "light");
  }, [isDarkTheme]);

  const dispatch = useDispatch();
//   const boards = useSelector((state) => state.boards);

  const handleHideSideNav = () => {
    setSideNavOpen(false);
  };

  const handleRevealSideNav = () => {
    setSideNavOpen(true);
  };

  return (
    <article
      id="sidenav"
      style={{ height: "calc(100vh - 6rem)" }}
      className={`Nav__theme SideNav ${
        sideNavOpen ? "" : "transform -translate-x-full "
      }`}
    >


      {/* number of boards */}
      <h3 className="Nav__theme-txt tracking-[2.4px] text-sm mb-[1.5rem] px-4 font-bold ">
        ALL BOARDS: {allData?.length}
      </h3>


      {/* list all boards*/}
      <div className=" min-h-[300px] overflow-y-auto ">
        {allData.map((board, index) => (
          <button
            key={index}
            className={`SideNav__btn ${
              board.isActive ? "SideNav__btn-active" : "SideNav__btn-inactive"
            }`}
            onClick={() => {
              dispatch(boardsSlice.actions.setBoardActive({ index }));
            }}
          >
            <BoardIcon />

            <p className="text-[1rem]  truncate">{board.name}</p>
          </button>
        ))}
      </div>


      {/* create a new board */}
      <div
        className={`Nav__items-position space-x-4 px-5 py-4 my-[1rem] mb-auto rounded hover:bg-secondary-200 
        hover:dark:bg-drkprimary-800`}
      >
        <BoardIcon />

        <button
          onClick={() => {
            dispatch(modalIsOpen({ type: "createBoard", modalDetail : { type : 'add' }}));
          }}
          className="text-md text-lghtprimary dark:text-darkprimary h-full "
        >
          <AddIcon sx={{ fontSize: ".75rem" }} />
          Create New Board
        </button>
      </div>



      {/* dark mode switch*/}
      <div className="Nav__theme-switch-cont ">
        <div className="Nav__theme Nav__items-position Nav__theme-switch-cont-inner">
          <div>
            <LightModeOutlinedIcon className="dark:text-darksecondary" />
          </div>

          <div>
            <DrkMdSwitch checked={isDarkTheme} toggle={toggleMode} />
          </div>

          <div>
            <DarkModeOutlinedIcon className="dark:text-darksecondary" />
          </div>
        </div>
      </div>



      {/* hide sidenav*/}
      <div className="mx-auto mt-[2rem]">
        <button
          onClick={handleHideSideNav}
          className="Nav__items-position gap-[.5rem] dark:text-darktext"
        >
          <VisibilityOffIcon />
          Hide Sidebar
        </button>
      </div>



      {/* reveal sidenav*/}
      {!sideNavOpen ? (
        <div className="relative z-200 shadow-md">
          <button className="SideNav__btn-reveal" onClick={handleRevealSideNav}>
            <VisibilityIcon fontSize="large" />
          </button>
        </div>
      ) : (
        ""
      )}


    </article>
  );
};

export default SideNav;
