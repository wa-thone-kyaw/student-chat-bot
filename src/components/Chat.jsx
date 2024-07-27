import React, { useState, useEffect, useRef } from "react";
import predefinedResponses from "../responses"; // Import the predefined responses
import botLogo from "../img/images1.jpg"; // Adjust the path if necessary

const Chat = ({ user }) => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [isTyping, setIsTyping] = useState(false); // State for typing effect
  const [typingTimeout, setTypingTimeout] = useState(null); // Timeout for typing effect

  const messagesEndRef = useRef(null);

  useEffect(() => {
    if (user) {
      const welcomeMessage = {
        id: 1,
        text: `Welcome, ${user.displayName}! How can I assist you today?`,
        user: "bot",
        avatar: botLogo, // Use the bot logo
      };
      setMessages([welcomeMessage]);
    }
  }, [user]);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

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
      setMessages(updatedMessages);
      setNewMessage("");
      setSuggestions([]); // Clear suggestions after sending a message

      // Simulate bot typing
      setIsTyping(true);
      if (typingTimeout) {
        clearTimeout(typingTimeout);
      }
      const timeout = setTimeout(() => {
        setIsTyping(false);
        // Determine bot's response
        const botReply = getBotReply(newMessage);
        if (botReply) {
          setMessages([...updatedMessages, botReply]);
        } else {
          setMessages(updatedMessages);
        }
      }, 1500); // Simulated typing delay in milliseconds
      setTypingTimeout(timeout);
    }
  };

  const getBotReply = (message) => {
    const lowerCaseMessage = message.toLowerCase();
    for (const [phrase, response] of Object.entries(predefinedResponses)) {
      if (lowerCaseMessage.includes(phrase.toLowerCase())) {
        return {
          id: messages.length + 2,
          text: response,
          user: "bot",
          avatar: botLogo, // Use the bot logo
        };
      }
    }

    return {
      id: messages.length + 2,
      text: "Sorry, I didn't understand that. Can you please rephrase?",
      user: "bot",
      avatar: botLogo, // Use the bot logo
    };
  };

  const handleInputChange = (e) => {
    const input = e.target.value;
    setNewMessage(input);

    if (input.trim()) {
      const lowerCaseInput = input.toLowerCase();
      const matchingSuggestions = Object.entries(predefinedResponses)
        .filter(([phrase]) => phrase.toLowerCase().includes(lowerCaseInput))
        .map(([phrase, response]) => ({ phrase, response }));
      setSuggestions(matchingSuggestions);
    } else {
      setSuggestions([]);
    }
  };

  const handleSuggestionClick = (suggestion) => {
    setNewMessage(suggestion.phrase);
    setSuggestions([]);
  };

  return (
    <div className="container mx-auto p-4 h-screen flex flex-col bg-gray-50 relative">
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
          {isTyping && (
            <div className="flex items-center space-x-2">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center">
                  <div className="w-2.5 h-2.5 rounded-full bg-gray-500 animate-bounce"></div>
                  <div className="w-2.5 h-2.5 rounded-full bg-gray-500 animate-bounce animation-delay-200"></div>
                  <div className="w-2.5 h-2.5 rounded-full bg-gray-500 animate-bounce animation-delay-400"></div>
                </div>
                <div className="flex-1 p-2 rounded-lg bg-gray-200 text-gray-800">
                  Typing...
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
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
      </form>
      {suggestions.length > 0 && (
        <div className="absolute bottom-16 left-0 right-0 mt-1 z-10 p-2 flex flex-wrap bg-transparent">
          {suggestions.map((suggestion, index) => (
            <button
              key={index}
              className="p-2 m-1 bg-blue-500 text-white rounded-full hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
              onClick={() => handleSuggestionClick(suggestion)}
            >
              {suggestion.phrase}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default Chat;
