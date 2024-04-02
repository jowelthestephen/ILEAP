// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth} from "firebase/auth";
import { getFirestore } from "firebase/firestore"
import {getStorage} from "firebase/storage"

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAQWQGjTywY9hjM5lsvI4O9GAGa7toT37g",
  authDomain: "ileap-a49b9.firebaseapp.com",
  projectId: "ileap-a49b9",
  storageBucket: "ileap-a49b9.appspot.com",
  messagingSenderId: "484042538340",
  appId: "1:484042538340:web:4daa041c359048b7d44e71",
  measurementId: "G-4DRPRDKH31"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app)
export const storage = getStorage(app)