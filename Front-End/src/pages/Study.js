// Study.js
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Category from './Category';
import './css/Study.css';



const Study = () => {
    const navigate = useNavigate();
    // Logout functionality
  const handleLogout = (event) => {
    event.preventDefault();
    localStorage.removeItem("loggedIn");
    navigate("/login"); // Redirect to login page after logout
  };

  // Navigate to Study page
  const handleJoinClass = () => {
    navigate("/study"); // Redirect to study page
  };

  return (
        <>
            {/* Header */}
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

      <div class="content-container">
    <div class="join-section">
        <input type="text" placeholder="Enter join code" class="join-input" />
        <button class="join-button">Join</button>
    </div>

    <div class="profile-card">
        <div class="profile-header">
            <span class="greeting">Hello, Quach</span>
            <button class="edit-button">✎</button>
        </div>
        <div class="coin-section">
            <div class="coin-request">
                <span class="coin-icon">💰</span> Request 100 Coins
            </div>
            <div class="coin-balance">
                <span class="coin-icon">🪙</span> 500 Coins
            </div>
        </div>
    </div>
</div>


            {/* Categories */}
            <main className="categories">
                <Category title="Ice Breaker" />
                <Category title="Math" />
                {/* Add more categories as needed */}
            </main>

            {/* Footer */}
            <footer>
                <div className="container">
                    <p>&copy; 2024 LearnLinguaAI. All Rights Reserved.</p>
                </div>
            </footer>
        </>
    );
};

export default Study;
