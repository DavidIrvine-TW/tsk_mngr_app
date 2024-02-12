import React, { useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import { useDispatch } from "react-redux";
import { modalIsClosed } from "../../redux/modalslice";
import ThirdParties from "../loggingIn/ThirdParties";
import { auth, db } from "../../firebase/firebase_config";
import { signInWithEmailAndPassword } from "firebase/auth";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { doc, getDoc } from "firebase/firestore";
import boardsSlice from "../../redux/boardsSlice";

const ExistingUser = ({ create, setCreate }) => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [demoUserChecked, setDemoUserChecked] = useState(false);
  const isDisabled = !email || !password;

  const onSignIn = async (e) => {
    e.preventDefault();

    try {
      await signInWithEmailAndPassword(auth, email, password);
      console.log("User signed in successfully");

      const signedInUser = auth.currentUser;
      const userDocRef = doc(db, "userData", signedInUser.uid);
      const userDocSnapshot = await getDoc(userDocRef);

      if (userDocSnapshot.exists()) {
        const userBoards = userDocSnapshot.data();
        const restructuredData = Object.values(userBoards);
        dispatch(
          boardsSlice.actions.useUserFireBaseData({
            userData: restructuredData,
          })
        );
      }

      toast.info(`Signed in as ${signedInUser.email}`, {
        position: "top-right",
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
    } catch (error) {
      console.error("Error signing in:", error.message);
      setError(error.message);
    }

    dispatch(modalIsClosed({ type: "" }));
  };

  const demoUserHandler = () => {
    if (demoUserChecked) {
      setEmail("");
      setPassword("");
      setDemoUserChecked(!demoUserChecked);
    } else {
      setEmail("demoUser@email.com");
      setPassword("demoUser@email.com");
      setDemoUserChecked(!demoUserChecked);
    }
  };

  return (
    <form className="Modal__form max-h-[650px] overflow-y-auto tb:overflow-y-hidden">
      <div className="Modal__form-head">
        <h2 className=" text-l ">Sign In</h2>
        <button
          className="Modal__form-close-btn"
          onClick={() => dispatch(modalIsClosed({ type: "" }))}
        >
          <CloseIcon />
        </button>
      </div>
      <div className="flex items-center mb-[1rem] gap-[1rem]">
      <input
          className="w-[15px] h-[15px] cursor-pointer"
          type="checkbox"
          onChange={demoUserHandler}
          checked={demoUserChecked}
        />
        <p className="text-center text-body-sm-mod">
          Demo login (demo users cannot write to the DB). 
        </p>
        
      </div>
      <div className="flex flex-col mb-[1.5rem]">
        <label className="Modal__formfield-label">Email*</label>
        <div className="border rounded">
          <input
            type="email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            className="Modal__form-input Modal__focus"
            placeholder="Email..."
            id="email-input"
          />
        </div>
        <span className="Modal__form-error">{error}</span>
      </div>

      <div className="flex flex-col mb-[1.5rem]">
        <label className="Modal__formfield-label">Password*</label>
        <div className="border rounded">
          <input
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            className="Modal__form-input Modal__focus"
            placeholder="Password..."
            id="password-input"
          />
        </div>
        <span className="Modal__form-error">{error}</span>
      </div>

      <button
        onClick={onSignIn}
        className={
          isDisabled
            ? "Modal__btn-primary-disabled w-full mt-[1rem]"
            : " Modal__btn-primary w-full mt-[1rem]"
        }
        disabled={isDisabled}
      >
        Sign In
      </button>

      <div className="flex items-center justify-center mt-[2rem]">
        <button onClick={() => setCreate(!create)}>Create an account?</button>
      </div>

      <ThirdParties />
    </form>
  );
};

export default ExistingUser;
