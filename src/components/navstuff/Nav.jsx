import ViewKanbanSharpIcon from "@mui/icons-material/ViewKanbanSharp";
import MoreVertTwoToneIcon from "@mui/icons-material/MoreVertTwoTone";
import ArrowDropDownOutlinedIcon from "@mui/icons-material/ArrowDropDownOutlined";
import AddIcon from "@mui/icons-material/Add";
import { useSelector, useDispatch } from "react-redux";
import { modalIsOpen } from "../../redux/modalslice";
import { useState } from "react";
import { useAuth } from "../loggingIn/AuthContext";

const Nav = ({ data, allData }) => {
  const [anim, setAnim] = useState(false);
  const dispatch = useDispatch();
  const { user } = useAuth();
  console.log(user);

  return (
    <header>
      <nav
        id="head-nav"
        className="Nav__theme Nav__items-position min-w-[375px] w-full border-b"
      >
        <div className="Nav__items-position">
          {/* Logo */}
          <div
            id="logo-container"
            className="Nav__items-position tb:w-[260px] dk:w-[300px] tb:border-r border-darksecondary p-4 h-[4rem] tb:h-[5rem] dk:h-[6rem]"
          >
            <ViewKanbanSharpIcon
              fontSize="large"
              className="text-lghtprimary"
            />

            <h1 className="Nav__theme-txt ml-4 hidden tb:inline-block font-bold text-[1.85rem] tracking-[.3px]">
              KANBAN
              <span className="text-body-sm-mod font-bold">Marv.Dev</span>
            </h1>
          </div>

          {/* active board name */}
          <div className="Nav__items-position p-4 dk:px-8">
            <h2 className="Nav__theme-txt fade-in truncate max-w-[250px] font-bold tb:text-l hidden tb:inline-block dk:text-xl">
              {allData.length < 1 ? "No Boards" : data.name}
            </h2>

            <button
              className="tb:hidden flex items-center"
              onClick={() => {
                setAnim((prevState) => !prevState);
                dispatch(modalIsOpen({ type: "mobileMenu" }));
              }}
            >
              <h2 className="Nav__theme-txt max-w-[200px] font-bold tb:text-l dk:text-xl fade-in truncate">
                {allData.length < 1 ? "No Boards" : data.name}
              </h2>

              <ArrowDropDownOutlinedIcon
                fontSize="large"
                style={{
                  transition: anim ? "transform 0.3s" : "",
                  transform: anim ? "rotate(180deg)" : "",
                }}
              />
            </button>
          </div>
        </div>

        {/* hide buttons if no boards*/}
        {allData.length < 1 ? (
          ""
        ) : (
          <div className="Nav__items-position ml-auto gap-[.5rem] p-4 dk:px-8 dk:gap-[1.5rem]">
            {/* Add a task */}
            <button
              onClick={() => {
                dispatch(modalIsOpen({ type: "addNew" }));
              }}
              className="Nav__btn-theme p-2 tb:px-4 tb:py-3  rounded-full tb:rounded flex items-center justify-center shadow-md"
            >
              <AddIcon
                sx={{ fontSize: "1rem" }}
                className="dark:text-darktext"
              />
              <span className="hidden tb:inline-block text-md Nav__theme-txt">
                New Task
              </span>
            </button>



            

            {/* elip menu */}
            <button
              onClick={() => dispatch(modalIsOpen({ type: "deleteEditMenu" }))}
              className="p-1"
            >
              <MoreVertTwoToneIcon
                sx={{ fontSize: "2rem" }}
                className="Nav__theme-txt hover:text-darktext hover:scale-105"
              />
            </button>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Nav;
