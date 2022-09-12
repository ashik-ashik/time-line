import { initializeApp } from "firebase/app";
import firebaseConfig from "../firebase.config/firebase.config";

const firebaseInit = () => {
  return initializeApp(firebaseConfig);
}

export default firebaseInit;