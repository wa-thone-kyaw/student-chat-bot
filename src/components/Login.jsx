// src/components/Login.js
import React from "react";
import { auth, provider, signOut } from "../firebase";
import { signInWithPopup } from "firebase/auth";
import { FaUser } from "react-icons/fa";

const Login = ({ user, setUser }) => {
  const signInWithGoogle = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        setUser(result.user);
      })
      .catch((error) => {
        console.log("Error during sign-in:", error.message);
      });
  };

  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        setUser(null);
      })
      .catch((error) => {
        console.log("Error during sign-out:", error.message);
      });
  };

  return (
    <div className="container mx-auto p-4 flex items-center">
      {user ? (
        <div className="flex items-center space-x-4">
          <FaUser size={24} />
          <span>{user.displayName}</span>
          <button
            onClick={handleLogout}
            className="bg-red-500 text-white p-2 rounded"
          >
            Logout
          </button>
        </div>
      ) : (
        <button
          onClick={signInWithGoogle}
          className="bg-blue-500 text-white p-2 rounded"
        >
          Sign in with Google
        </button>
      )}
    </div>
  );
};

export default Login;
