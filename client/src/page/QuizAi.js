import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './css/ChatbotPage.css';

const QuizAi = () => {
  const navigate = useNavigate();

  // Logout functionality
  const handleLogout = (event) => {
    event.preventDefault();
    localStorage.removeItem("loggedIn");
    navigate("/login"); // Redirect to login page after logout
  };

  return (
    <div>
      {/* Header Section */}
      <header className="Header">
        <div className="container">
          <Link to="home/" className="logo">LearnLinguaAI</Link>
          <nav>
            <ul>
              <li><Link to="/home">Home</Link></li>
              <li><Link to="/teacher">Teacher</Link></li>
              <li><Link to="/quiz" className="active">QuizAi</Link></li>
              <li className="dropdown">
                <a href="#" className="dropbtn">See More</a>
                <div className="Dropdown-content">
                  <Link to="/contact">Contact</Link>
                  <Link to="/setting">Setting</Link>
                  <Link to="/chatbot">Chat</Link>
                </div>
              </li>
            </ul>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main>
        <div className="chatbot-container">
          <iframe
            src="https://chatbot.mindpal.space/674af6e97d5faadc11d0ea8c"
            allow="clipboard-read; clipboard-write; microphone"
            className="chatbot-iframe"
            title="Chatbot"
          ></iframe>
        </div>
      </main>
    </div>
  );
};

export default QuizAi;
