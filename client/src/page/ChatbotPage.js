import React, { useState } from "react";
import "./css/ChatbotPage.css";

const ChatbotMessenger = () => {
  const [messages, setMessages] = useState([
    { content: "How can I help you?", role: "assistant" },
  ]);
  const [inputMessage, setInputMessage] = useState("");
  const [chatbotResponse, setChatbotResponse] = useState("");
  const [error, setError] = useState("");

  const API_URL = "https://www.chatbase.co/api/v1/chat";
  const API_KEY = "58585775-d058-4228-a38b-14eac11927eb";
  const CHATBOT_ID = "WqpEHCHu7nrwmQ1VjPBDX";

  const sendMessage = async (e) => {
    e.preventDefault();
    setError("");
    setChatbotResponse("");

    if (!inputMessage.trim()) {
      setError("Please enter a message.");
      return;
    }

    const updatedMessages = [...messages, { content: inputMessage, role: "user" }];
    setMessages(updatedMessages);

    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          messages: updatedMessages,
          chatbotId: CHATBOT_ID,
          stream: false,
          model: "gpt-3.5-turbo",
          temperature: 0,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to fetch response.");
      }

      const data = await response.json();
      setChatbotResponse(data.text);
      setMessages([...updatedMessages, { content: data.text, role: "assistant" }]);
    } catch (err) {
      console.error(err);
      setError(err.message || "An error occurred while sending the message.");
    }

    setInputMessage("");
  };

  return (
    <div className="chatbot-container">
      <h1>Chat with Your Chatbot</h1>
      <div className="chat-window">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`message ${message.role === "user" ? "user-message" : "assistant-message"}`}
          >
            <strong>{message.role === "user" ? "You" : "Chatbot"}:</strong> {message.content}
          </div>
        ))}
      </div>

      <form className="chat-input-form" onSubmit={sendMessage}>
        <input
          type="text"
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
          placeholder="Type your message..."
          className="chat-input"
        />
        <button type="submit" className="chat-send-button">
          Send
        </button>
      </form>

      {chatbotResponse && (
        <div className="chat-response">
          <p>
            <strong>Chatbot Response:</strong> {chatbotResponse}
          </p>
        </div>
      )}

      {error && <div className="chat-error">{error}</div>}
    </div>
  );
};

export default ChatbotMessenger;
