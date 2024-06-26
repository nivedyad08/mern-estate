// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-estate-d9fc9.firebaseapp.com",
  projectId: "mern-estate-d9fc9",
  storageBucket: "mern-estate-d9fc9.appspot.com",
  messagingSenderId: "689350989445",
  appId: "1:689350989445:web:b0c5d45f26918007703bec",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
