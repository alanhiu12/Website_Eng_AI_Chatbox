import React, { useState } from 'react';
import './css/ChatbotPage.css';
import { Link, useNavigate } from 'react-router-dom';

const ChatBotBox = () => {
  const navigate = useNavigate();
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  // Logout functionality
  const handleLogout = (event) => {
    event.preventDefault();
    localStorage.removeItem("loggedIn");
    navigate("/login"); // Redirect to login page after logout
  };

  // Function to handle sending messages
  const handleSendMessage = (e) => {
    e.preventDefault();
    if (input.trim() === "") return;

    const userMessage = { text: input, sender: "user" };
    const botReply = { text: "Đang xử lý...", sender: "bot" };

    setMessages([...messages, userMessage, botReply]);
    setInput("");

    // Simulate bot reply after a delay
    setTimeout(() => {
      setMessages((prevMessages) =>
        prevMessages.map((msg, idx) =>
          idx === prevMessages.length - 1
            ? { ...msg, text: "Đây là câu trả lời từ bot." }
            : msg
        )
      );
    }, 1000);
  };

  return (
    <div className="chatbot-box">
      <header>
        <div className="container">
          <Link to="/" className="logo">LearnLinguaAI</Link>
          <nav>
            <ul>
              <li><Link to="/" className="active">Home</Link></li>
              <li><Link to="/classes">Classes</Link></li>
              <li><Link to="/about">About</Link></li>
              <li className="dropdown">
                <a href="#" className="dropbtn">See More</a>
                <div className="dropdown-content">
                  <Link to="/user-profile">Profile</Link>
                  <Link to="/contact">Contact</Link>
                  <Link to="/setting">Setting</Link>
                  <Link to="/teacher">Teacher</Link>
                  <Link to="/chatbot">Chat</Link>
                  <a href="#" onClick={handleLogout}>Logout</a>
                </div>
              </li>
            </ul>
          </nav>
        </div>
      </header>

      <div className="chat-header">
        <h2>Chat với Bot</h2>
      </div>

      <div className="chat-body">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`message ${message.sender === "user" ? "user-message" : "bot-message"}`}
          >
            {message.text}
          </div>
        ))}
      </div>

      <form className="chat-input" onSubmit={handleSendMessage}>
        <input
          type="text"
          placeholder="Nhập tin nhắn..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button type="submit">Gửi</button>
      </form>
    </div>
  );
};

export default ChatBotBox;
