
import { initializeApp } from "firebase/app";
import {getAuth, GoogleAuthProvider} from 'firebase/auth'
import {getFirestore} from 'firebase/firestore'




const firebaseConfig = {
  apiKey: "AIzaSyDwIUehUFmmqN_-uknY4lOXXk-fll9BbnQ",
  authDomain: "kanban-54446.firebaseapp.com",
  projectId: "kanban-54446",
  storageBucket: "kanban-54446.appspot.com",
  messagingSenderId: "920937324892",
  appId: "1:920937324892:web:077147ab2bb540a10ca199",
  measurementId: "G-0TM6MZJW4C"
};



const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
export const googleProvider = new GoogleAuthProvider()
export const db = getFirestore(app)