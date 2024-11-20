import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './css/SettingsPage.css';

const SettingsPage = () => {
  const navigate = useNavigate();

  // Logout functionality
  const handleLogout = (event) => {
    event.preventDefault();
    localStorage.removeItem("loggedIn");
    navigate("/login"); // Redirect to login page after logout
  };
  return (
  <div>
    <header className="header">
  <div className="container">
    <Link to="/" className="logo">LearnLinguaAI</Link>
    <nav className="homepage-nav">
      <ul>
        <li><Link to="/" >Home</Link></li>
        <li><Link to="/classes">Classes</Link></li>
        <li><Link to="/chatbot">Chat</Link></li>
        <li><Link to="/payment">Payment</Link></li>
        <li className="dropdown">
          <a href="#" className="dropbtn">See More</a>
          <div className="dropdown-content">
            <Link to="/admin">Admin</Link>
            <Link to="/user-profile">Profile</Link>
            <Link to="/contact">Contact</Link>
            <Link to="/setting" className="active" >Setting</Link>
            <Link to="/teacher">Teacher</Link>
            <a href="#" onClick={handleLogout}>Logout</a>
          </div>
        </li>
      </ul>
    </nav>
  </div>
</header>
    <div className="settings-page">
      <h1 className="settings-section">Settings</h1>
      <div className="settings-section">
        <h2>👤 Profile</h2>
        <div className="settings-item">
          <span>Username</span>
          <span className="settings-value">halo47665_82077</span>
        </div>
        <div className="settings-item">
          <span>Name</span>
          <span className="settings-value">Trịnh Hieu</span>
        </div>
        <div className="settings-item">
          <span>Gmail</span>
          <span className="settings-value">halo47665@gmail.com</span>
        </div>  
        <div className="settings-item">
          <span>Classes</span>
          <span className="settings-value">1 class</span>
        </div>
      </div>

      <div className="settings-section">
          <h2>🔒 Privacy Settings</h2>
          <div className="settings-item">
            <span>Show Online Status</span>
            <input type="checkbox" />
          </div>
          <div className="settings-item">
            <span>Enable Activity Tracking</span>
            <input type="checkbox" defaultChecked />
          </div>
          <div className="settings-item">
            <span>Allow Friend Requests</span>
            <input type="checkbox" defaultChecked />
          </div>
          <div className="settings-item">
            <span>Share Profile Information</span>
            <input type="checkbox" />
          </div>
        </div>

        <div className="settings-section">
          <h2>🔔 Notification Settings</h2>
          <div className="settings-item">
            <span>Email Notifications</span>
            <input type="checkbox" defaultChecked />
          </div>
          <div className="settings-item">
            <span>Push Notifications</span>
            <input type="checkbox" defaultChecked />
          </div>
          <div className="settings-item">
            <span>Message Alerts</span>
            <input type="checkbox" />
          </div>
          <div className="settings-item">
            <span>Reminders</span>
            <input type="checkbox" />
          </div>
        </div>


      <div className="settings-section">
        <h2>🔐 Account settings</h2>
        <Link to="/update-password" className="settings-item">
          Update password
        </Link>
        <Link to="/delete-account" className="settings-item">
          Delete account
        </Link>
        <a href="#" onClick={handleLogout}>Logout</a>
      </div>

      <footer className="settings-footer">
        <Link to="/contact">
          <i className="fas fa-envelope"></i> Contact Us
        </Link>
        <Link to="/about">
          <i className="fas fa-file-contract"></i> About
        </Link>
        <Link to="/help">
          <i className="fas fa-shield-alt"></i> Help
        </Link>
      </footer>
    </div>
  </div>
  );
};

export default SettingsPage;
