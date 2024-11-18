// Chatbot Component
// This React component integrates a chatbot using Chatbase's embedded script and iframe,
// along with a header for navigation and logout functionality similar to the homepage.

import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './css/HomePage.css'; // Import your CSS file

const Chatbot = () => {
  const navigate = useNavigate();

  // Logout functionality
  const handleLogout = (event) => {
    event.preventDefault();
    localStorage.removeItem("loggedIn");
    navigate("/login"); // Redirect to login page after logout
  };

  useEffect(() => {
    // Dynamically create the chatbot configuration script
    const chatbotScript = document.createElement('script');
    chatbotScript.src = "https://www.chatbase.co/embed.min.js";
    chatbotScript.defer = true;
    chatbotScript.setAttribute("chatbotId", "fg7EHhAK8iHpmf_4ZF_VL");
    chatbotScript.setAttribute("domain", "www.chatbase.co");
    document.body.appendChild(chatbotScript);

    // Configure the embedded chatbot
    const chatbotConfigScript = document.createElement('script');
    chatbotConfigScript.innerHTML = `
      window.embeddedChatbotConfig = {
        chatbotId: "fg7EHhAK8iHpmf_4ZF_VL",
        domain: "www.chatbase.co"
      };
    `;
    document.body.appendChild(chatbotConfigScript);

    // Clean up by removing the scripts when the component is unmounted
    return () => {
      document.body.removeChild(chatbotScript);
      document.body.removeChild(chatbotConfigScript);
    };
  }, []);

  return (
    <div>
      <header>
        <div className="container">
          <Link to="/" className="logo">LearnLinguaAI</Link>
          <nav>
            <ul>
              <li><Link to="/" className="active">Home</Link></li>
              <li><Link to="/classes">Classes</Link></li>
              <li><Link to="/about">About</Link></li>
              <li><Link to="/payment">Payment</Link> </li>
              <li className="dropdown">
                <a href="#" className="dropbtn">See More</a>
                <div className="dropdown-content">
                  <Link to="/admin">Admin</Link>
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

      {/* Chatbot iframe */}
      <iframe
        src="https://www.chatbase.co/chatbot-iframe/fg7EHhAK8iHpmf_4ZF_VL"
        width="100%"
        style={{ height: '100%', minHeight: '700px' }}
        frameBorder="0"
        title="Chatbot"
      ></iframe>
    </div>
  );
};

export default Chatbot;