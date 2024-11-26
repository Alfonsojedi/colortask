// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth";
import {getDatabase} from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDIJ2ydH2s22KB-_fzMcTpvdWFl-4bxetQ",
  authDomain: "colortask-40e10.firebaseapp.com",
  databaseURL: "https://colortask-40e10-default-rtdb.europe-west1.firebasedatabase.app/",
  projectId: "colortask-40e10",
  storageBucket: "colortask-40e10.firebasestorage.app",
  messagingSenderId: "393291527855",
  appId: "1:393291527855:web:0ee3c6d818163db200065a",
  measurementId: "G-HB5BEK3JVM"
};

// Initialize Firebase
export const fire_app = initializeApp(firebaseConfig);
export const fire_auth = getAuth(fire_app);
export const fire_db = getDatabase(fire_app);