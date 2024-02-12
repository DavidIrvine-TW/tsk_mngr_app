import React, { useState } from "react";
import { modalIsClosed } from "../../redux/modalslice";
import { useDispatch } from "react-redux";
import CreateAcct from "../loggingIn/CreateAcct";
import ExisitingUser from "../loggingIn/ExisitingUser";



const SignInModal = () => {

  const dispatch = useDispatch();
  const [create, setCreate] = useState(false);


  return (
    <section
      id="signin-modal"
      className="Modal"
      onClick={(e) => {
        if (e.target !== e.currentTarget) {
          return;
        }
        dispatch(modalIsClosed({ type: "" }));
      }}
    >
      <article>
        {create ? (
          <CreateAcct create={create} setCreate={setCreate} />
        ) : (
          <ExisitingUser create={create} setCreate={setCreate}/>
        )}  
      </article>
    </section>
  );
};

export default SignInModal;
