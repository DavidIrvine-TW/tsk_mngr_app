import { modalIsClosed, modalIsOpen } from "../../redux/modalslice";
import { useDispatch, useSelector } from "react-redux";
import { useAuth } from "../loggingIn/AuthContext";
import { auth, db } from "../../firebase/firebase_config";
import { doc, setDoc } from "firebase/firestore";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const DeleteEditMenuModal = () => {
  const dispatch = useDispatch();
  const boards = useSelector((state) => state.boards);
  const { user, loading, signOut } = useAuth();

  const handleSignOut = async () => {

    try {
     
      await saveUserDataToFirestore();
  
      await signOut();

      toast.info("User signed out", {
        position: "bottom-right",
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        style: {
          background: "#212121",
          color: "#FC4747",
          border: "2px solid #fafafa",
        },
      });
  
      dispatch(modalIsClosed({ type: "" }));
    } catch (error) {
      console.error("Sign-out error:", error.message);
    }
  };

  const saveUserDataToFirestore = async () => {
    try {
      if (user.email === "demouser@email.com") {
        console.log("No database operations available with demo acct ");
        return;
      }
  
      const testData = {
        ...boards
      };
  
      const userDocRef = doc(db, "userData", user.uid);
      await setDoc(userDocRef, testData);

    } catch (error) {
      console.error("Error adding document: ", error);
    }
  };

  

  return (
    <section
      className="ModalClearBg"
      onClick={(e) => {
        if (e.target !== e.currentTarget) {
          return;
        }
        dispatch(modalIsClosed({ type: "" }));
      }}
    >
      <article
        id="dropdown-delete-edit-menu"
        className="absolute top-[5rem] right-[1rem] p-4 flex flex-col gap-[1rem] items-start border rounded bg-lghtbackground  dark:bg-drkbackground-950 dark:border-darksecondary shadow-md"
      >
        <div className="flex flex-col gap-[1rem]">
          {user?.email ? (
            <>
              <p className="text-gray-500 ">Logged in as...</p>
              {user?.photoURL ? (
                <div className="w-[40px] h-[40px] rounded-full overflow-hidden">
                  <img src={user.photoURL} />
                </div>
              ) : (
                ""
              )}
              <p className="text-gray-500 text-body-sm-mod">{user?.email}</p>
              <button
                onClick={handleSignOut}
                className="Modal__btn Modal__btn-primary Modal__focus w-full"
              >
                Logout
              </button>
            </>
          ) : (
            <button
              onClick={() => {
                dispatch(modalIsClosed({ type: "" }));
                dispatch(modalIsOpen({ type: "signin" }));
              }}
              className="Modal__btn Modal__btn-primary Modal__focus w-full"
            >
              Sign In
            </button>
          )}

          <hr />

          <button
            onClick={() => {
              dispatch(modalIsClosed({ type: "" }));
              dispatch(modalIsOpen({ type: "editBoard" }));
            }}
            className=" font-bold w-[150px] py-1 px-2 text-left hover:underline dark:text-darktext"
          >
            Edit Board
          </button>

          <button
            onClick={() => {
              dispatch(modalIsClosed({ type: "" }));
              dispatch(modalIsOpen({ type: "deleteBoard" }));
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
