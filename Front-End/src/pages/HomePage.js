import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './css/HomePage.css'; // Import your CSS file

const Home = () => {
  const navigate = useNavigate();

  // Logout functionality
  const handleLogout = (event) => {
    event.preventDefault();
    localStorage.removeItem("loggedIn");
    navigate("/login"); // Redirect to login pages after logout
  };

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

      {/* Hero Section */}
      <section id="hero">
        <div className="container">
          <h1>Welcome to LearnLinguaAI</h1>
          <p>Boost your English skills with AI-driven exercises and personalized learning paths!</p>
          <Link to="/login" className="cta-btn">Start Learning Now</Link>
        </div>
      </section>

      {/* Features Section */}
      <section id="features">
        <div className="container">
          <h2>Why LearnLinguaAI?</h2>
          <div className="features-list">
            <div className="feature-item">
              <h3>Personalized Learning</h3>
              <p>AI tailors lessons to your proficiency level, ensuring you learn at your own pace.</p>
            </div>
            <div className="feature-item">
              <h3>Interactive Exercises</h3>
              <p>Engage in a variety of exercises from grammar to vocabulary to boost your skills.</p>
            </div>
            <div className="feature-item">
              <h3>Instant Feedback</h3>
              <p>Receive real-time feedback on your progress, helping you improve faster.</p>
            </div>
          </div>
        </div>
      </section>

      <footer>
        <div className="container">
          <p>&copy; 2024 LearnLinguaAI. All Rights Reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Home;
