// src/ChatbotPage.js
import React, { useState } from 'react';
import ChatInput from './components/ChatInput';
import ChatBox from './components/ChatBox';
import './ChatbotPage.css';

const ChatbotPage = () => {
  const [messages, setMessages] = useState([]);

  // Simulate API response for now (You will replace this with actual API call)
  const sendMessageToChatbot = async (message) => {
    const newMessage = { sender: 'user', text: message };
    setMessages([...messages, newMessage]);

    // Simulate chatbot response (This should come from the chatbot API)
    const response = await simulateChatbotResponse(message);
    setMessages((prevMessages) => [...prevMessages, response]);
  };

  // Simulate a chatbot response (this function will be replaced with a real API call)
  const simulateChatbotResponse = (message) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          sender: 'bot',
          text: `Chatbot phản hồi: ${message}`,
          audio: 'https://example.com/audio.mp3',  // Replace with actual audio URL from API
        });
      }, 1000);
    });
  };

  return (
    <div className="chatbot-page">
      <ChatBox messages={messages} />
      <ChatInput onSubmit={sendMessageToChatbot} />
    </div>
  );
};

export default ChatbotPage;
