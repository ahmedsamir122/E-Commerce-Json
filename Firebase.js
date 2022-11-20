import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import {getFirestore} from 'firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBwhbp1klk9Pu9zTCJZ_qV6dPjj2NFU9YI",
  authDomain: "react-test-aefc2.firebaseapp.com",
  databaseURL: "https://react-test-aefc2-default-rtdb.firebaseio.com",
  projectId: "react-test-aefc2",
  storageBucket: "react-test-aefc2.appspot.com",
  messagingSenderId: "218274088793",
  appId: "1:218274088793:web:8f1fb8d40954c5c533ee48"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);