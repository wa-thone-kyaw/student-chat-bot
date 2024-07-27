import React from "react";
import { useNavigate } from "react-router-dom";
import botImage2 from "../img/images2.png"; // Adjust the path as necessary
import "./About.css";

const About = ({ user }) => {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    if (user) {
      navigate("/chat");
    } else {
      navigate("/login");
    }
  };

  return (
    <div className="container mx-auto p-6">
      <div className="text-center mb-12">
        <h1 className="text-6xl font-bold mb-4">
          Revolutionize Students Service with Chatbot
        </h1>
        <p className="text-xl mb-4">
          Say goodbye to long wait times and frustrating interactions. Our
          chatbot robots provide 24/7 assistance and personalized service for
          your students.
        </p>
        <button
          onClick={handleGetStarted}
          className="bg-blue-500 text-white py-3 px-6 rounded-lg text-lg font-semibold hover:bg-blue-600 transition duration-300"
        >
          Get Started
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
        <div className="flex flex-col items-center text-center">
          <h2 className="text-3xl font-semibold">Benefit</h2>
          <p className="text-lg">
            Our chat bot provides instant responses to student queries, saving
            time and improving efficiency.
            <div></div>
            <br /> 24/7 Availability: Provides support and information outside
            of regular school hours, helping students with their queries at any
            time.
            <div></div>
            <br /> Administrative Support: Assists with administrative tasks
            like scheduling, reminders, and answering questions about policies
            and procedures.
          </p>
        </div>
        <div className="flex flex-col items-center text-center">
          <img src={botImage2} alt="Chat Bot" className="w-1/2 mb-4" />
          <h2 className="text-3xl font-semibold">Bot Bot ❤️</h2>
          <p className="text-lg">
            I will help you in reducing the workload of administrative staff by
            handling routine inquiries.
          </p>
        </div>
      </div>
      <div className="text-center mt-6">
        <p className="text-lg mb-6">
          © 2024 Student Chat Bot. All rights reserved.
        </p>
      </div>
    </div>
  );
};

export default About;
