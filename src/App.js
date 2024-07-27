import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Navbar from "./components/Navbar";
import About from "./pages/About";
import Chat from "./components/Chat";
import Home from "./components/Home";
import { auth } from "./firebase";
import { onAuthStateChanged } from "firebase/auth";
import "./AppUpdate.css";

const App = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user ? user : null);
    });
    return () => unsubscribe();
  }, []);

  return (
    <Router>
      <Navbar user={user} setUser={setUser} />
      <Routes>
        <Route path="/about" element={<About />} />
        <Route
          path="/chat"
          element={user ? <Chat user={user} /> : <Navigate to="/" />}
        />
        <Route path="/" element={<About />} />
      </Routes>
    </Router>
  );
};

export default App;
