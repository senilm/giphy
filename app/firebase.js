// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore'
import 'firebase/firestore'
import {getAuth} from "firebase/auth"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBClCinNhSf3hYYxFzDNXZ1XkQtbb1dJug",
  authDomain: "giphy-bb9d7.firebaseapp.com",
  projectId: "giphy-bb9d7",
  storageBucket: "giphy-bb9d7.appspot.com",
  messagingSenderId: "837324571009",
  appId: "1:837324571009:web:9cbf245e7e0cefe8afa880"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app)

export { auth,db}