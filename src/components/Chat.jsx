import React, { useState, useEffect } from "react";
import predefinedResponses from "../responses"; // Import the predefined responses

const Chat = ({ user }) => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");

  useEffect(() => {
    if (user) {
      const welcomeMessage = {
        id: 1,
        text: `Welcome, ${user.displayName}! How can I assist you today?`,
        user: "bot",
        avatar: "https://via.placeholder.com/40", // Bot avatar
      };
      setMessages([welcomeMessage]);
    }
  }, [user]);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (newMessage.trim()) {
      const userMessage = {
        id: messages.length + 1,
        text: newMessage,
        user: "user",
        avatar: user.photoURL || "https://via.placeholder.com/40", // User avatar
      };
      setMessages([...messages, userMessage]);

      // Determine bot's response
      const botReply = getBotReply(newMessage);
      if (botReply) {
        setMessages([...messages, userMessage, botReply]);
      }

      setNewMessage("");
    }
  };

  // Function to get bot's response based on predefined phrases
  const getBotReply = (message) => {
    const lowerCaseMessage = message.toLowerCase();
    for (const [phrase, response] of Object.entries(predefinedResponses)) {
      if (lowerCaseMessage.includes(phrase)) {
        return {
          id: messages.length + 2,
          text: response,
          user: "bot",
          avatar: "https://via.placeholder.com/40", // Bot avatar
        };
      }
    }

    // Default response for unknown input
    return {
      id: messages.length + 2,
      text: "Sorry, I didn't understand that. Can you please rephrase?",
      user: "bot",
      avatar: "https://via.placeholder.com/40", // Bot avatar
    };
  };

  return (
    <div className="container mx-auto p-4 h-screen flex flex-col">
      <div className="flex-1 overflow-auto bg-gray-100 p-4 rounded-lg shadow-md">
        <div className="flex flex-col space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${
                message.user === "user" ? "justify-end" : "justify-start"
              }`}
            >
              <div className="flex items-start space-x-2">
                {message.user === "bot" && (
                  <img
                    src={message.avatar}
                    alt="Bot"
                    className="w-8 h-8 rounded-full"
                  />
                )}
                <div
                  className={`p-3 rounded-lg max-w-xs text-white ${
                    message.user === "user"
                      ? "bg-blue-500 text-white"
                      : "bg-gray-300 text-gray-800"
                  }`}
                >
                  {message.text}
                </div>
                {message.user === "user" && (
                  <img
                    src={message.avatar}
                    alt="User"
                    className="w-8 h-8 rounded-full"
                  />
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
      <form
        onSubmit={handleSendMessage}
        className="flex mt-4 bg-gray-100 p-2 rounded-lg shadow-md"
      >
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Type your message..."
          className="flex-1 p-2 border border-gray-300 rounded-lg mr-2"
        />
        <button type="submit" className="bg-blue-500 text-white p-2 rounded-lg">
          Send
        </button>
      </form>
    </div>
  );
};

export default Chat;
