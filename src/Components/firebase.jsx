import { initializeApp } from "firebase/app";
import { getFirestore} from "firebase/firestore";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyA9EIRIpLULXPWr0uQGHRVxFYnHJ6FEjpY",
    authDomain: "react-crud-ff987.firebaseapp.com",
    databaseURL: "https://react-crud-ff987-default-rtdb.firebaseio.com",
    projectId: "react-crud-ff987",
    storageBucket: "react-crud-ff987.firebasestorage.app",
    messagingSenderId: "683072703182",
    appId: "1:683072703182:web:7cce716aa411ecbbb99e9f",
    measurementId: "G-H8M7GK0QVZ"
  };

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth=getAuth(app)
export { db,auth,createUserWithEmailAndPassword };
