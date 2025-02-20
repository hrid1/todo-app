// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDZp-x8_Sx3U93jtcnnr1VSb4mxBN5fkYc",
  authDomain: "todo-hr-app.firebaseapp.com",
  projectId: "todo-hr-app",
  storageBucket: "todo-hr-app.firebasestorage.app",
  messagingSenderId: "957718200267",
  appId: "1:957718200267:web:06f2364abe918635b0c04e"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)