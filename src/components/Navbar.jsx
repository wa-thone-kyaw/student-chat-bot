// src/components/Navbar.js
import React from "react";
import { Link } from "react-router-dom";
import { FaUser } from "react-icons/fa";
import { signOut } from "../firebase";
import { auth } from "../firebase";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";

const Navbar = ({ user, setUser }) => {
  const provider = new GoogleAuthProvider();

  const handleSignIn = () => {
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
    <nav className="bg-gray-800 text-white p-4 flex justify-between items-center">
      <Link to="/" className="text-xl">
        Student Chat Bot
      </Link>
      <div className="flex items-center space-x-4">
        <Link to="/about" className="hover:underline">
          About Us
        </Link>
        {user ? (
          <>
            <Link to="/chat" className="hover:underline">
              Chat
            </Link>
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
          </>
        ) : (
          <button
            onClick={handleSignIn}
            className="bg-blue-500 text-white p-2 rounded"
          >
            Login with Google
          </button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
