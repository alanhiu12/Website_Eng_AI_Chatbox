// ChatbotPage.js
import React, { useState } from 'react';
import ChatInput from '../components/ChatInput';
import ChatBox from '../components/ChatBox';
import axios from 'axios';
import './css/ChatbotPage.css';

const ChatbotPage = () => {
  const [messages, setMessages] = useState([]);

  const sendMessageToChatbot = async (message) => {
    setMessages((prev) => [...prev, { sender: 'user', text: message }]);

    try {
      const response = await axios.post('http://localhost:3500/api/chat', { message });
      setMessages((prev) => [...prev, { sender: 'bot', text: response.data.reply }]);
    } catch (error) {
      console.error('Lỗi gửi tin nhắn:', error);
    }
  };

  return (
    <div className="chatbot-page">
      <ChatBox messages={messages} />
      <ChatInput onSubmit={sendMessageToChatbot} />
    </div>
  );
};

export default ChatbotPage;
