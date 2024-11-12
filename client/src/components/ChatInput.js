// ChatInput.js
import React, { useState } from 'react';
import './styles/ChatInput.css';

const ChatInput = ({ onSubmit }) => {
  const [message, setMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (message.trim()) {
      onSubmit(message); // Truyền message trực tiếp
      setMessage(''); // Xóa nội dung sau khi gửi
    }
  };

  return (
    <form className="chat-input" onSubmit={handleSubmit}>
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Nhập nội dung..."
      />
      <button type="submit">Gửi</button>
    </form>
  );
};

export default ChatInput;
