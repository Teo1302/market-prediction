// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD55KLKZ5ox04D1TocuKFPCxZbnMTrjxOI",
  authDomain: "fir-foodi-client-f8b5c.firebaseapp.com",
  projectId: "fir-foodi-client-f8b5c",
  storageBucket: "fir-foodi-client-f8b5c.appspot.com",
  messagingSenderId: "662397711076",
  appId: "1:662397711076:web:51175e7cb3d91ca7fdb2f1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app;