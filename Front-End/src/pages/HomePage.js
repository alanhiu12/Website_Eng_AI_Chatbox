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
      <header className="header">
  <div className="container">
    <Link to="/" className="logo">LearnLinguaAI</Link>
    <nav className="homepage-nav">
      <ul>
        <li><Link to="/" className="active">Home</Link></li>
        <li><Link to="/classes">Classes</Link></li>
        <li><Link to="/chatbot">Chat</Link></li>
        <li><Link to="/payment">Payment</Link></li>
        <li className="dropdown">
          <a href="#" className="dropbtn">See More</a>
          <div className="dropdown-content">
            <Link to="/admin">Admin</Link>
            <Link to="/user-profile">Profile</Link>
            <Link to="/contact">Contact</Link>
            <Link to="/setting">Setting</Link>
            <Link to="/teacher">Teacher</Link>
            <Link to="/score">Score</Link>
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

      {/* How it Works Section */}
      <section id="how-it-works">
        <div className="container">
          <h2>How It Works</h2>
          <div className="steps">
            <div className="step">
              <h3>1. Sign Up</h3>
              <p>Create an account to start your journey with LearnLinguaAI.</p>
            </div>
            <div className="step">
              <h3>2. Take a Placement Test</h3>
              <p>Our AI analyzes your current proficiency level to customize your learning experience.</p>
            </div>
            <div className="step">
              <h3>3. Start Learning</h3>
              <p>Access tailored lessons, quizzes, and exercises to improve your skills.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials">
        <div className="container">
          <h2>What Our Users Say</h2>
          <div className="testimonial-list">
            <div className="testimonial">
              <p>"LearnLinguaAI has completely transformed the way I learn languages. The AI recommendations are spot-on!"</p>
              <h4>- Jane Doe</h4>
            </div>
            <div className="testimonial">
              <p>"The interactive exercises are so engaging, and the feedback helps me improve quickly!"</p>
              <h4>- John Smith</h4>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing">
        <div className="container">
          <h2>Pricing Plans</h2>
          <div className="pricing-cards">
            <div className="card">
              <h3>Basic</h3>
              <p>Free</p>
              <p>Access to basic lessons and exercises.</p>
            </div>
            <div className="card">
              <h3>Pro</h3>
              <p>$9.99/month</p>
              <p>Includes advanced lessons, personalized feedback, and more.</p>
            </div>
            <div className="card">
              <h3>Premium</h3>
              <p>$19.99/month</p>
              <p>All features, including one-on-one AI tutoring and exclusive content.</p>
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
