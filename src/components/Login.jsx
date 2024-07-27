import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { auth, provider, signOut } from "../firebase";
import { signInWithPopup } from "firebase/auth";
import { FaUser } from "react-icons/fa";
import "./Login.css"; // Import custom CSS file for background animation

const Login = ({ user, setUser }) => {
  const navigate = useNavigate();

  const signInWithGoogle = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        setUser(result.user);
      })
      .catch((error) => {
        console.error("Error during sign-in:", error.message);
      });
  };

  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        setUser(null);
      })
      .catch((error) => {
        console.error("Error during sign-out:", error.message);
      });
  };

  useEffect(() => {
    if (user) {
      navigate("/chat");
    }
  }, [user, navigate]);

  // Generate random letters including Myanmar characters
  const generateFallingLetters = (count) => {
    const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    const myanmarLetters = "ကခဂဃငစဆဇဈညတထဒဓနပဖဗဘမယရလဝသဟဠအ"; // Myanmar characters
    const allLetters = letters + myanmarLetters;

    return Array.from({ length: count }).map((_, index) => {
      const char = allLetters[Math.floor(Math.random() * allLetters.length)];
      return (
        <div
          key={index}
          className="falling-letter"
          style={{
            fontSize: `${Math.random() * 20 + 30}px`, // Randomize font size
            left: `${Math.random() * 100}%`,
            animationDuration: `${Math.random() * 10 + 5}s`,
            animationDelay: `${Math.random() * 10}s`,
          }}
        >
          {char}
        </div>
      );
    });
  };

  return (
    <div className="login-container">
      {generateFallingLetters(50)} {/* Number of falling letters */}
      <div className="login-content">
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
            className="bg-blue-500 text-white p-4 rounded hover:bg-blue-600 transition duration-300"
          >
            Sign in with Google
          </button>
        )}
      </div>
    </div>
  );
};

export default Login;
