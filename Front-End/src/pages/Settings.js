import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './css/SettingsPage.css'; // Đảm bảo đường dẫn đúng

const SettingsPage = () => {
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState('profile'); // State lưu mục đang chọn

  // Xử lý logout
  const handleLogout = (event) => {
    event.preventDefault();
    localStorage.removeItem('loggedIn'); // Xóa trạng thái đăng nhập
    navigate('/login'); // Chuyển hướng về trang đăng nhập
  };
  const [showPopup, setShowPopup] = useState(false);
const [profile, setProfile] = useState({
  username: "halo47665_82077",
  name: "Trịnh Hieu",
  email: "halo47665@gmail.com",
  classes: "1 class",
});
const [editProfile, setEditProfile] = useState({ ...profile });

const handleEdit = () => {
  setEditProfile({ ...profile });
  setShowPopup(true);
};

const handleSave = () => {
  setProfile({ ...editProfile }); // Cập nhật thông tin hiển thị
  setShowPopup(false); // Đóng popup
};

const handleCancel = () => setShowPopup(false);

const handleChange = (e) => {
  const { name, value } = e.target;
  setEditProfile((prev) => ({
    ...prev,
    [name]: value,
  }));

};


  // Render từng phần trong Settings
  const renderSection = () => {
    switch (activeSection) {
      case 'profile':
        return (
          <div className="section-content">
          <h2>👤 Profile</h2>
          <div className="settings-item">
            <span>Username</span>
            <span className="settings-value">{profile.username}</span>
          </div>
          <div className="settings-item">
            <span>Name</span>
            <span className="settings-value">{profile.name}</span>
          </div>
          <div className="settings-item">
            <span>Email</span>
            <span className="settings-value">{profile.email}</span>
          </div>
          <div className="settings-item">
            <span>Classes</span>
            <span className="settings-value">{profile.classes}</span>
          </div>
          <div className="settings-actions">
            <button onClick={handleEdit}>Edit</button>
          </div>
      
          {showPopup && (
            <div className="popup-overlay">
              <div className="popup-content">
                <h3>Edit Profile</h3>
                <label>
                  <h4>Username:</h4>
                  <input
                    type="text"
                    name="username"
                    value={editProfile.username}
                    onChange={handleChange}
                  />
                </label>
                <label>
                  <h4>Name:</h4>
                  <input
                    type="text"
                    name="name"
                    value={editProfile.name}
                    onChange={handleChange}
                  />
                </label>
                <label>
                  <h4>Email:</h4>
                  <input
                    type="email"
                    name="email"
                    value={editProfile.email}
                    onChange={handleChange}
                  />
                </label>
                <div className="popup-actions">
                <div className="saveset"><button onClick={handleSave}>Save</button></div>
                <div className="cancelset"><button onClick={handleCancel}>Cancel</button></div>
                </div>
              </div>
            </div>
          )}
        </div>

        );
      case 'privacy':
        return (
          <div className="section-content">
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
        );
      case 'notifications':
        return (
          <div className="section-content">
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
        );
      case 'account':
        return (
          <div className="section-content">
            <h2>🔐 Account Settings</h2>
            <Link to="/update-password" className="settings-item-btn">
              Update Password
            </Link>
            <Link to="/delete-account" className="settings-item-btn danger">
              Delete Account
            </Link>
            <a href="#" onClick={handleLogout} className="settings-item-btn danger">
              Logout
            </a>
          </div>
        );
      default:
        return <div className="section-content">Select a section</div>;
    }
  };

  return (
    <div>
      {/* Header */}
      <header className="header">
        <div className="container">
          <Link to="/" className="logo">
            LearnLinguaAI
          </Link>
          <nav className="homepage-nav">
            <ul>
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/classes">Classes</Link>
              </li>
              <li>
                <Link to="/chatbot">Chat</Link>
              </li>
              <li>
                <Link to="/payment">Payment</Link>
              </li>
              <li className="dropdown">
                <a href="#" className="dropbtn">
                  See More
                </a>
                <div className="dropdown-content">
                  <Link to="/admin">Admin</Link>
                  <Link to="/user-profile">Profile</Link>
                  <Link to="/contact">Contact</Link>
                  <Link to="/setting" className="active">
                    Setting
                  </Link>
                  <Link to="/teacher">Teacher</Link>
                  <a href="#" onClick={handleLogout}>
                    Logout
                  </a>
                </div>
              </li>
            </ul>
          </nav>
        </div>
      </header>

      {/* Body */}
      <div className="settings-page">
        
        <div className="settings-body">
          
          {/* Sidebar */}
          <nav className="settings-sidebar">
            <h1 className="settings-title">Settings</h1>
            <ul>
              <li
                className={activeSection === 'profile' ? 'active' : ''}
                onClick={() => setActiveSection('profile')}
              >
                Profile
              </li>
              <li
                className={activeSection === 'privacy' ? 'active' : ''}
                onClick={() => setActiveSection('privacy')}
              >
                Privacy Settings
              </li>
              <li
                className={activeSection === 'notifications' ? 'active' : ''}
                onClick={() => setActiveSection('notifications')}
              >
                Notification Settings
              </li>
              <li
                className={activeSection === 'account' ? 'active' : ''}
                onClick={() => setActiveSection('account')}
              >
                Account Settings
              </li>
            </ul>
          </nav>

          {/* Main Content */}
          <div className="settings-content">{renderSection()}</div>
        </div>

        {/* Footer */}
        <footer className="settings-footer">
          <div className="footer-links">
            <Link to="/contact">Contact Us</Link>
            <Link to="/about">About</Link>
            <Link to="/help">Help</Link>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default SettingsPage;
