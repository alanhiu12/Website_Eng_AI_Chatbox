import React, { useState } from 'react';
import './css/SettingsPage.css'; // Import CSS cho trang Settings

const Settings = () => {
  // Các trạng thái cho các trường nhập liệu
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [theme, setTheme] = useState('light'); // light or dark theme

  // Hàm xử lý khi người dùng lưu các thay đổi
  const handleSaveChanges = (e) => {
    e.preventDefault();
    // Giả định lưu thông tin (có thể sử dụng API hoặc localStorage)
    console.log('Saved changes:', { username, email, password, theme });
    alert('Your changes have been saved!');
  };

  return (
    <div className="settings-page">
      <header>
        <div className="container">
          <h1>Settings</h1>
        </div>
      </header>

      <section id="settings-section">
        <div className="container">
          <form onSubmit={handleSaveChanges}>
            {/* Username */}
            <div className="form-group">
              <label htmlFor="username">Username</label>
              <input
                type="text"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter your username"
              />
            </div>

            {/* Email */}
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
              />
            </div>

            {/* Password */}
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your new password"
              />
            </div>

            {/* Theme Selection */}
            <div className="form-group">
              <label htmlFor="theme">Theme</label>
              <select
                id="theme"
                value={theme}
                onChange={(e) => setTheme(e.target.value)}
              >
                <option value="light">Light</option>
                <option value="dark">Dark</option>
              </select>
            </div>

            <button type="submit" className="save-btn">Save Changes</button>
          </form>
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

export default Settings;
