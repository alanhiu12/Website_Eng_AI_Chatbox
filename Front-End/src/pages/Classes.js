import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './css/Classes.css'; // Import CSS for styling
import huohuoImage from '../assets/pictures/huohuo.jpg';

const ClassPage = () => {
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

      <main className="main-content">
        <div className="empty-state">
          <img src={huohuoImage} alt="Empty state" className="empty-image" />
          <h2>You haven’t joined any classes yet.</h2>
          <button className="join-class-button" onClick={handleJoinClass}>
            Join a Class
          </button>
        </div>
      </main>

      <footer>
        <div className="container">
          <p>&copy; 2024 LearnLinguaAI. All Rights Reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default ClassPage;
