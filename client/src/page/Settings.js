import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './css/SettingsPage.css';

const SettingsPage = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Trạng thái đăng nhập
  const [userRole, setUserRole] = useState(null); // Vai trò người dùng
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);
  
  // Load user data from localStorage
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUserData(JSON.parse(storedUser));
    }
    const loggedInStatus = localStorage.getItem("loggedIn");
    const role = localStorage.getItem("userRole");
    setIsLoggedIn(loggedInStatus === "true");
    setUserRole(role);
  }, []);

  // Logout functionality
  const handleLogout = (event) => {
    event.preventDefault();
    localStorage.removeItem("loggedIn");
    localStorage.removeItem("user"); // Xóa thông tin người dùng
    navigate("/login"); // Redirect to login page after logout
  };

  // Delete account functionality
  const handleDeleteAccount = () => {
    const userConfirmed = window.confirm(
      "Are you sure you want to delete your account? This action cannot be undone."
    );
    if (userConfirmed) {
      // Xóa dữ liệu người dùng khỏi localStorage
      localStorage.removeItem("user");
      localStorage.removeItem("loggedIn");

      // Điều hướng người dùng về trang chính
      navigate("/login");
    }
  };

  return (
    <div>
      <header className='Header'>
        <div className="container">
          <Link to="/home" className="logo">LearnLinguaAI</Link>
          <nav>
            <ul>
              <li><Link to="/home">Home</Link></li>
              <li>{userRole === 'teacher' && <Link to="/teacher">Teacher</Link>}</li>
              <li>{userRole === 'student' && <Link to="/classes">Classes</Link>}</li>
             
              <li className="dropdown">
                <a href="#" className="dropbtn">See More</a>
                <div className="Dropdown-content">
                  <Link to="/contact">Contact</Link>
                  <Link to="/setting" className="active">Setting</Link>
                  <Link to="/chatbot">Chat</Link>
                </div>
              </li>
            </ul>
          </nav>
        </div>
      </header>
      <div className="settings-page">
        <h1>Settings</h1>
        <div className="settings-section">
          <h2>👤 Profile</h2>
          {userData ? (
            <>
              <div className="settings-item">
                <span>Username</span>
                <span className="settings-value">{userData.fullname || 'N/A'}</span>
              </div>
              <div className="settings-item">
                <span>Created At</span>
                <span className="settings-value">{new Date(userData.createdAt).toLocaleDateString()}</span>
              </div>
              <div className="settings-item">
                <span>Email</span>
                <span className="settings-value">{userData.email || 'N/A'}</span>
              </div>
              <div className="settings-item">
                <span>Role</span>
                <span className="settings-value">{userData.role || 'N/A'}</span>
              </div>
            </>
          ) : (
            <p>Loading user data...</p>
          )}
          <div className='bua'>         
            <Link to="/update-password" className="lvup">
            Update password
          </Link>

          <a href="#" className='tuhuy' onClick={handleLogout}>Logout</a>
          </div></div>
        </div>


        <footer className="settings-footer">
          <Link to="/contact">
            <i className="fas fa-envelope"></i> Contact Us
          </Link>
          <Link to="/about">
            <i className="fas fa-file-contract"></i> Terms of Service
          </Link>
          <Link to="/help">
            <i className="fas fa-shield-alt"></i> Help
          </Link>
        </footer>
      </div>
    
  );
};

export default SettingsPage;
