import { modalIsClosed, modalIsOpen } from "../../redux/modalSlice";
import { useDispatch } from "react-redux";


const DeleteEditMenuModal = () => {

  const dispatch = useDispatch()


  return (
    <section 
      className="ModalClearBg"
      onClick={(e) => {
        if (e.target !== e.currentTarget) {
          return;
        }
        dispatch(modalIsClosed({type: ''}));
      }}
    > 

    <article
      id="dropdown-delete-edit-menu"
      className="absolute top-[5rem] right-[1rem] p-4 flex flex-col gap-[1rem] items-start border rounded bg-lghtbackground  dark:bg-drkbackground-950 dark:border-darksecondary shadow-md"
    >
    
      <div className="flex flex-col gap-[1rem]">

          <button
            onClick={() => {
              dispatch(modalIsClosed({type: ""}))
              dispatch(modalIsOpen({type: "editBoard"}))
            }}
            className=" font-bold w-[150px] py-1 px-2 text-left hover:underline dark:text-darktext"
            >
              Edit Board
          </button>

          <button 
            onClick={() => {
              dispatch(modalIsClosed({type: ""}))
              dispatch(modalIsOpen({type: "deleteBoard"}))
            }}
            className="text-lghtprimary font-bold w-[150px] py-1 px-2 text-left hover:underline"
            >
              Delete Board    
          </button>

      </div>

    </article>
    </section>
  );
};

export default DeleteEditMenuModal;
