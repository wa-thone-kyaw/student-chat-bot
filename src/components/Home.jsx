import React from "react";
import { Link } from "react-router-dom";
import { useSpring, animated } from "react-spring";
import { FaRobot } from "react-icons/fa";
import "./Home.css";

const Home = () => {
  const fadeIn = useSpring({
    from: { opacity: 0 },
    to: { opacity: 1 },
    config: { duration: 1000 },
  });

  return (
    <div className="home-container">
      <animated.div style={fadeIn} className="home-content">
        <FaRobot className="home-robot-icon" />
        <h1>Welcome to Student Chat Bot</h1>
        <p>Your virtual assistant for all your queries.</p>
        <Link to="/chat" className="home-button">
          Start Chatting
        </Link>
      </animated.div>
    </div>
  );
};

export default Home;
