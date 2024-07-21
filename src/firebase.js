// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider , signOut} from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC23wFqTEw9MmfxXA417dR8qYYnD4ixxRE",
  authDomain: "student-chat-bot-e92cb.firebaseapp.com",
  projectId: "student-chat-bot-e92cb",
  storageBucket: "student-chat-bot-e92cb.appspot.com",
  messagingSenderId: "1032380402837",
  appId: "1:1032380402837:web:630b308805275eb7281f9c",
  measurementId: "G-EC4ZERQYES",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

// Initialize Firestore
const db = getFirestore(app);

export { auth, provider, db , signOut};
