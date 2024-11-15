import React, { useState } from 'react';
import './css/SettingsPage.css'; // Ensure this path exists
import { Link, useNavigate } from 'react-router-dom';

const devices = [
  {
    id: 1,
    name: 'DESKTOP-IS3FA9A',
    details: 'ROG Strix G513IH_G513IH (ASUSTeK COMPUTER INC.)',
    lastAccess: '18/10/2024 12:23:55'
  },
  {
    id: 2,
    name: 'MAY-14',
    details: 'System Product Name (ASUS)',
    lastAccess: '5/10/2024 19:05:50'
  },
  {
    id: 3,
    name: 'MAY-34',
    details: 'System Product Name (ASUS)',
    lastAccess: '2/10/2024 20:09:25'
  },
  {
    id: 4,
    name: 'iPhone',
    details: 'iPhone 12 mini',
    lastAccess: '30/9/2024 11:58:46'
  }
];


const Settings = () => {
  const [activeTab, setActiveTab] = useState('personal'); // Personal info as default
  const [isEditingName, setIsEditingName] = useState(false); // Toggle for editing name
  const [username, setUsername] = useState('A****u'); // Initial username

  const handleNameChange = (e) => {
    setUsername(e.target.value);
  };
  
  const navigate = useNavigate();

  const handleLogout = (event) => {
      event.preventDefault();
      localStorage.removeItem("loggedIn");
      navigate("/login"); // Redirect to login page after logout
  };
  const toggleEditName = () => {
    setIsEditingName(!isEditingName);
  };

  return (
    <div className="settings-pages">
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

      <div className="settings-container">
        {/* Sidebar Navigation */}
        <div className="sidebar">
          <ul>
            <li className={activeTab === 'overview' ? 'active' : ''} onClick={() => setActiveTab('overview')}>
              Tổng Quan Tài Khoản
            </li>
            <li className={activeTab === 'personal' ? 'active' : ''} onClick={() => setActiveTab('personal')}>
              Thông Tin Cá Nhân
            </li>
            <li className={activeTab === 'security' ? 'active' : ''} onClick={() => setActiveTab('security')}>
              Mật Khẩu Và An Toàn
            </li>
            <li className={activeTab === 'linked' ? 'active' : ''} onClick={() => setActiveTab('linked')}>
              Liên Kết Tài Khoản
            </li>
          </ul>
        </div>

        {/* Main Content */}
        <div className="settings-content">
        {activeTab === 'overview' && (
            <div className="overview-section">
              <h2>Tổng Quan Tài Khoản</h2>
              
              <div className="info-section">
                <div className="info-item">
                  <span>Tên Người Dùng</span>
                  <span>A****iu</span>
                  <a href="#" className="manage-link">Quản Lý</a>
                </div>
                <div className="info-item">
                  <span>Email</span>
                  <span>al****04@gmail.com</span>
                  <a href="#" className="manage-link">Quản Lý</a>
                </div>
                <div className="info-item">
                  <span>Số Điện Thoại</span>
                  <span>087****12</span>
                  <a href="#" className="manage-link">Quản Lý</a>
                </div>
              </div>
              
              <div className="security-section">
                <h3>Mật Khẩu Và An Toàn</h3>
                <div className="password-info">
                  <span>Mật Khẩu</span>
                  <span>Lần Cập Nhật Trước 7/10/2024</span>
                  <a href="#" className="manage-link">Quản Lý</a>
                </div>
                <div className="trusted-devices">
                  <span>Thiết Bị Tin Cậy</span>
                  <span>2</span>
                  <a href="#" className="manage-link">Quản Lý</a>
                </div>
              </div>
              
              <div className="linked-accounts-section">
                <h3>Liên Kết Tài Khoản</h3>
                <ul className="linked-accounts-list">
                  <li>
                    <img src="/images/google-icon.png" alt="Google" className="account-icon" />
                    <span></span>
                    <span>Trịnh Hiếu</span>
                  </li>
                  <li>
                    <img src="/images/facebook-icon.png" alt="Facebook" className="account-icon" />
                    <span></span>
                    <span>...</span>
                  </li>
                  <li>
                    <img src="/images/apple-icon.png" alt="Apple" className="account-icon" />
                    <span></span>
                    <span>...</span>
                  </li>
                  <li>
                    <img src="/images/x-icon.png" alt="Twitter" className="account-icon" />
                    <span></span>
                    <span>...</span>
                  </li>
                </ul>
              </div>
            </div>
          )}

          {activeTab === 'personal' && (
          <div className="personal-info">
            <h2>Thông Tin Cá Nhân</h2>
            <div className="info-section">
            <div className="info-item">
                <span>Tên Người Dùng</span>
                {isEditingName ? (
                  <input
                    type="text"
                    value={username}
                    onChange={handleNameChange}
                    className="name-input"
                  />
                ) : (
                  <span>{username}</span>
                )}
                <a href="#" onClick={toggleEditName} className="manage-link">
                  {isEditingName ? 'Lưu' : 'Thay Đổi Tên'}
                </a>
              </div>
              <div className="info-item">
                <span>Email</span>
                <span>al****04@gmail.com</span>
                <a href="#" className="manage-link">Thay Đổi Email Liên Kết</a>
              </div>
              <div className="info-item">
                <span>Số Điện Thoại</span>
                <span>087****12</span>
                <a href="#" className="manage-link">Hủy Liên Kết Số Điện Thoại</a>
              </div>
            </div>

            <div className="delete-account-section">
              <h3>Xóa Tài Khoản</h3>
              <p>Nếu xóa tài khoản, sau khi quá trình này hoàn tất, chúng tôi sẽ không thể khôi phục lại tài khoản của bạn. Vui lòng thận trọng khi thao tác.</p>
              <a href="#" className="delete-link">Yêu Cầu Xóa Tài Khoản</a>
            </div>
          </div>
        )}
          {activeTab === 'security' && (
            <div className="security-section">
            <h2>Mật Khẩu Và An Toàn</h2>
            <div className="password-section">
              <span>Mật Khẩu</span>
              <span className="last-updated">Lần Cập Nhật Trước 7/10/2024</span>
              <a href="#" className="update-link">Cập Nhật</a>
            </div>

            <div className="trusted-devices">
              <h3>Thiết Bị Tin Cậy</h3>
              <ul className="device-list">
                {devices.map((device) => (
                  <li key={device.id} className="device-item">
                    <div className="device-info">
                      <strong>{device.name}</strong>
                      <p>{device.details}</p>
                    </div>
                    <div className="device-meta">
                      <span>{device.lastAccess}</span>
                      <a href="#" className="remove-device-link">Xóa</a>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          )}
          {activeTab === 'linked' && (
            <div className="linked-accounts-section">
            <h2>Liên Kết Tài Khoản</h2>
            <ul className="linked-accounts-list">
              {[
                { id: 1, platform: 'Google', status: '✔', linked: true },
                { id: 2, platform: 'Facebook', status: 'Chưa liên kết', linked: false },
                { id: 3, platform: 'Apple', status: 'Chưa liên kết', linked: false },
                { id: 4, platform: 'X', status: 'Chưa liên kết', linked: false }
              ].map(account => (
                <li key={account.id} className="account-item">
                  <div className="account-details">
                    <img
                      src={`/images/${account.platform.toLowerCase()}-icon.png`}
                      alt={`${account.platform} icon`}
                      className="account-icon"
                    />
                    <span>{account.platform}</span>
                  </div>
                  <div className="account-status">
                    {account.linked ? (
                      <span className="linked-text">{account.status}</span>
                    ) : (
                      <a href="#" className="link-button">Liên Kết</a>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          </div>
          )}
        </div>
      </div>

      <footer>
        <div className="container">
          <p>&copy; 2024 LearnLinguaAI. All Rights Reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Settings;
