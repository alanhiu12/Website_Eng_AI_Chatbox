// src/components/About.js
import React from 'react';
import { Link } from 'react-router-dom';
import './About.css'; // Assuming you have a CSS file for styling

const About = () => {
  return (
    <div>
      {/* Header */}
      <header>
        <div className="container">
          {/* Wrapped the logo in a Link */}
          <Link to="/" className="logo">LearnLinguaAI</Link>
          <nav>
            <ul>
              <li><Link to="/">Home</Link></li>
              <li><Link to="/study">Exercises</Link></li>
              <li><Link to="/about" className="active">About</Link></li>
              <li className="dropdown">
                <a href="#" className="dropbtn">See More</a>
                <div className="dropdown-content">
                  <Link to="/user-profile">Profile</Link>
                  <Link to="/contact">Contact</Link>
                  <a href="#" id="logout-link">Logout</a>
                </div>
              </li>
            </ul>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main>
        <section id="about-project">
          <h2>About LearnLinguaAI</h2>
          <p>LearnLinguaAI is a project aimed at revolutionizing the way people learn new languages by leveraging the power of artificial intelligence. Our platform provides tailored lessons, quizzes, and pronunciation tips that adapt to each learner's progress and skill level, making language learning more effective and engaging.</p>
        </section>

        <section id="technology">
          <h2>Technology Behind the Project</h2>
          <ul>
            <li><strong>Artificial Intelligence:</strong> AI algorithms personalize the learning experience for each user.</li>
            <li><strong>Natural Language Processing (NLP):</strong> NLP helps in understanding and analyzing user inputs to provide accurate feedback on language usage and pronunciation.</li>
            <li><strong>JavaScript & Web Technologies:</strong> The platform is built using modern web technologies like HTML, CSS, and JavaScript for an interactive and seamless learning experience.</li>
          </ul>
        </section>

        <section id="team">
          <h2>Meet the Team</h2>
          <div className="team-grid">
            <div className="team-member">
              <h3>Lai Van Cuong</h3>
              <p>Lead Developer & AI Specialist</p>
            </div>
            <div className="team-member">
              <h3>Trinh Minh Hieu</h3>
              <p>UI/UX Designer</p>
            </div>
            <div className="team-member">
              <h3>Nguyen Trong Nghia</h3>
              <p>Content Creator & Language Expert</p>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer>
        <div className="container">
          <p>&copy; 2024 LearnLinguaAI. All Rights Reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default About;
