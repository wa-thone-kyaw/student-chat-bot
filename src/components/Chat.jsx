import React, { useState, useEffect } from "react";
import predefinedResponses from "../responses"; // Import the predefined responses

const Chat = ({ user }) => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [suggestions, setSuggestions] = useState([]);

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

      const updatedMessages = [...messages, userMessage];

      // Determine bot's response
      const botReply = getBotReply(newMessage);
      if (botReply) {
        setMessages([...updatedMessages, botReply]);
      } else {
        setMessages(updatedMessages);
      }

      setNewMessage("");
      setSuggestions([]); // Clear suggestions after sending a message
    }
  };

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

    return {
      id: messages.length + 2,
      text: "Sorry, I didn't understand that. Can you please rephrase?",
      user: "bot",
      avatar: "https://via.placeholder.com/40", // Bot avatar
    };
  };

  const handleInputChange = (e) => {
    const input = e.target.value;
    setNewMessage(input);

    if (input.trim()) {
      const lowerCaseInput = input.toLowerCase();
      const matchingSuggestions = Object.keys(predefinedResponses).filter(
        (phrase) => phrase.toLowerCase().includes(lowerCaseInput)
      );
      setSuggestions(matchingSuggestions);
    } else {
      setSuggestions([]);
    }
  };

  const handleSuggestionClick = (suggestion) => {
    setNewMessage(suggestion);
    setSuggestions([]);
  };

  return (
    <div className="container mx-auto p-4 h-screen flex flex-col bg-gray-50">
      <div className="flex-1 overflow-auto bg-white p-6 rounded-lg shadow-md">
        <div className="flex flex-col space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${
                message.user === "user" ? "justify-end" : "justify-start"
              }`}
            >
              <div className="flex items-start space-x-2 max-w-xs">
                {message.user === "bot" && (
                  <img
                    src={message.avatar}
                    alt="Bot"
                    className="w-8 h-8 rounded-full"
                  />
                )}
                <div
                  className={`p-4 rounded-lg shadow-md ${
                    message.user === "user"
                      ? "bg-blue-500 text-white"
                      : "bg-gray-200 text-gray-800"
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
        className="flex mt-4 bg-white p-4 rounded-lg shadow-md relative"
      >
        <input
          type="text"
          value={newMessage}
          onChange={handleInputChange}
          placeholder="Type your message..."
          className="flex-1 p-2 border border-gray-300 rounded-lg mr-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          type="submit"
          className="bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Send
        </button>
        {suggestions.length > 0 && (
          <div className="absolute left-0 right-0 top-full bg-white border border-gray-300 rounded-lg shadow-md mt-1">
            {suggestions.map((suggestion, index) => (
              <div
                key={index}
                className="p-2 cursor-pointer hover:bg-gray-200"
                onClick={() => handleSuggestionClick(suggestion)}
              >
                {suggestion}
              </div>
            ))}
          </div>
        )}
      </form>
    </div>
  );
};

export default Chat;
