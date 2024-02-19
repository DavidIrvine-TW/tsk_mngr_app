import boardsSlice from "../../redux/boardsSlice";
import { useSelector, useDispatch } from "react-redux";
import BoardIcon from "../icons/BoardIcon";
import AddIcon from "@mui/icons-material/Add";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import DrkMdSwitch from "../switch/DrkMdSwitch";
import useToggle from "../../hooks/useToggle";
import { useEffect } from "react";
import { modalIsClosed, modalIsOpen } from "../../redux/modalSlice";

const BoardsMenuModal = () => {

  const [isDarkTheme, toggleMode] = useToggle(
    localStorage.getItem("theme-color") === "dark"
  );

  const dispatch = useDispatch()
  const boards = useSelector((state) => state.boards);

  useEffect(() => {
    document.documentElement.className = isDarkTheme ? "dark" : "";
    localStorage.setItem("theme-color", isDarkTheme ? "dark" : "light");
  }, [isDarkTheme]);

  return (
    <section
      id="mobile-board-menu-modal"
      className="Modal"
      onClick={(e) => {
        if (e.target !== e.currentTarget) {
          return;
        }
        dispatch(modalIsClosed({ type: "" }));
      }}
    >
      
      <article className="w-[265px] rounded bg-lghtbackground text-lghttext  dark:bg-drkbackground-950 shadow-md p-4 flex flex-col gap-[.5rem]">


        <h2 className="tracking-[2.4px] text-sm mb-[1rem] px-4 dark:text-darktext">
          ALL BOARDS: {boards?.length}
        </h2>


        {boards.map((board, index) => (
          <button
            key={index}
            className={`Modal__btn ${
              board.isActive ? "Modal__btn-primary " : "Modal__btn-secondary"
            }`}
            onClick={() => {
              dispatch(boardsSlice.actions.setBoardActive({ index }));
              dispatch(modalIsClosed({ type: "" }));
            }}
          >
            <BoardIcon />
            <p className="text-md">{board.name}</p>
          </button>
        ))}



        <div
          className={`Nav__items-position space-x-4 px-5 py-4 my-[1rem]  hover:bg-secondary-200 hover:dark:bg-drkprimary-800`}
        >
          <BoardIcon />
          <button
            onClick={() => {
              dispatch(modalIsOpen({ type: "createBoard", modalDetail : { type : 'add' }}));
            }}
            className="text-md text-lghtprimary"
          >
            <AddIcon sx={{ fontSize: ".75rem" }} />
            Create New Board
          </button>
        </div>


        <div className="Nav__theme-switch-cont">
          <div className="Nav__theme-switch-cont-inner">
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


      </article>
    </section>
  );
};

export default BoardsMenuModal;
