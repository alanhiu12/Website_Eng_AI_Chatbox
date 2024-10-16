import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './HomePage.css'; // Ensure you have your styles in place

const HomePage = () => {
  const navigate = useNavigate(); // Hook to navigate between pages
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    // Logic for handling the form data
    console.log("Email:", email);
    console.log("Message:", message);
    alert('Form submitted successfully!');
    setEmail('');
    setMessage('');
  };

  const handleLoginClick = () => {
    navigate('/login'); // Navigate to login page
  };

  return (
    <div>
      {/* Header */}
      <header>
        <div className="container">
          <a href="/" className="logo">LearnLinguaAI</a>
          <nav>
            <ul>
              <li><a href="/" className="active">Home</a></li>
              <li><a href="#" onClick={handleLoginClick}>Login</a></li>
              <li><a href="#">About</a></li>
              <li><a href="#">Contact</a></li>
            </ul>
          </nav>
        </div>
        <div className="header-divider"></div> {/* Pixel divider under the header */}
      </header>

      {/* Hero Section */}
      <section id="hero">
        <h1>AI-Powered English Learning Chatbot</h1>
        <p>Discover the benefits of our AI system and how it supports English learners effectively.</p>
        <a href="#" className="cta-btn" onClick={handleLoginClick}>Start Learning Now</a>
      </section>

      {/* Features Section */}
      <section id="features">
        <div className="container">
          <h2>Key Features</h2>
          <div className="features-list">
            <div className="feature-item">
              <h3>Personalized Learning</h3>
              <p>Lessons and feedback tailored to your proficiency level for personalized learning.</p>
            </div>
            <div className="feature-item">
              <h3>Multi-language Support</h3>
              <p>The chatbot supports multiple languages to help ease the learning process.</p>
            </div>
            <div className="feature-item">
              <h3>Progress Tracking</h3>
              <p>Track your progress and improve your skills with automatic assessments.</p>
            </div>
          </div>
        </div>
      </section>
      {/* Footer */}
      <footer>
        <p>&copy; 2024 LearnLinguaAI. All Rights Reserved.</p>
      </footer>
    </div>
  );
};

export default HomePage;
