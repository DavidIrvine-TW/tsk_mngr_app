import React, { useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import { useDispatch } from "react-redux";
import { modalIsClosed } from "../../redux/modalslice";
import {auth} from '../../firebase/firebase_config'
import { createUserWithEmailAndPassword } from "firebase/auth";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const CreateAcct = ({ create, setCreate }) => {

  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordRepeated, setPasswordRepeated] = useState("");
  const [error, setError] = useState(null);
  const isDisabled = !email || !password || !passwordRepeated


  const isEmailValid = (email) => {
    const emailValidator = /\S+@\S+\.\S+/;
    return emailValidator.test(email);
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    try {
     
      if (!isEmailValid(email)) {
        setError("Invalid email address");
        return;
      }

     
      if (password !== passwordRepeated) {
        setError("Passwords do not match");
        return;
      }

  
      setError(null);

      await createUserWithEmailAndPassword(auth, email, password);
      console.log("User created successfully");
      dispatch(modalIsClosed({type: ""}))
    } catch (error) {
      console.error("Error creating user:", error.message);
      setError(error.message);
    }

    
     const unsubscribe = auth.onAuthStateChanged((signedInUser) => {
      if (signedInUser) {
      
        toast.info(`Account created successfully. Signed in as ${signedInUser.email}`, {
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
      }

      unsubscribe();
    });

    



  };

  return (
    <form
      onSubmit={onSubmit}
      className="Modal__form max-h-[650px] overflow-y-auto tb:overflow-y-hidden"
    >
      <div className="Modal__form-head">
        <h2 className=" text-l ">Create Account</h2>

        <button
          className="Modal__form-close-btn"
          onClick={() => dispatch(modalIsClosed({ type: "" }))}
        >
          <CloseIcon />
        </button>
      </div>

      <div className="flex flex-col mb-[1.5rem]">
        <label className="Modal__formfield-label">Enter an email*</label>
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
      </div>

      <div className="flex flex-col mb-[.5rem]">
        <label className="Modal__formfield-label">Password*</label>
        <div className="border rounded">
          <input
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            className="Modal__form-input Modal__focus"
            placeholder="password"
            id="email-input"
          />
        </div>
      </div>

      <div className="flex flex-col mb-[1.5rem]">
        <div className="border rounded">
          <input
            type="password"
            onChange={(e) => setPasswordRepeated(e.target.value)}
            value={passwordRepeated}
            className="Modal__form-input Modal__focus"
            placeholder="repeat password"
            id="password-input"
          />
        </div>
        <span className="Modal__form-error">{error}</span>
      </div>

      <button
        onClick={(e) => {
          onSubmit(e);
        }}
        className={isDisabled ? "Modal__btn-primary-disabled w-full mt-[1rem]" : ' Modal__btn-primary w-full mt-[1rem]'}
        disabled={isDisabled}
      >
       Create
      </button>

      <div className="flex items-center justify-center mt-[2rem]">
        <button onClick={() => setCreate(!create)}>
          Back
        </button>
      </div>
    </form>
  );
};

export default CreateAcct;
