import React from "react";
import { GoogleLoginButton } from "react-social-login-buttons";
import { auth, db } from "../../firebase/firebase_config";
import { googleProvider } from "../../firebase/firebase_config";
import { signInWithPopup } from "firebase/auth";
import { useDispatch } from "react-redux";
import { modalIsClosed } from "../../redux/modalslice";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { doc, getDoc } from "firebase/firestore";
import boardsSlice from "../../redux/boardsSlice";

const ThirdParties = () => {

  const dispatch = useDispatch();

  const googleSignIN = async () => {
  try {
    await signInWithPopup(auth, googleProvider);

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
    } else {
      console.error("User data does not exist in Firestore.");
    }

    dispatch(modalIsClosed({ type: "" }));
  } catch (error) {
    console.error("Failed to log in with Google", error.message);
  }

  const unsubscribe = auth.onAuthStateChanged((signedInUser) => {
    if (signedInUser) {
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
    }
    unsubscribe();
  });
};

  return (
    <>
      <p className="mb-[.5rem]  mt-[1rem] text-gray-500 text-center">or</p>
      <div className="flex items-center justify-center mt-[1rem]">
        <GoogleLoginButton
          onClick={googleSignIN}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        />
      </div>
    </>
  );
};

export default ThirdParties;
