import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './css/HomePage.css';

const Home = () => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Khởi tạo trạng thái đăng nhập
  const [userRole, setUserRole] = useState(null); // Khởi tạo trạng thái vai trò người dùng

  useEffect(() => {
    // Lấy trạng thái đăng nhập và vai trò từ localStorage khi component được mount
    const loggedInStatus = localStorage.getItem("loggedIn");
    const role = localStorage.getItem("userRole");
    setIsLoggedIn(loggedInStatus === "true"); // Kiểm tra giá trị loggedIn (chuỗi "true" từ localStorage)
    setUserRole(role); // Gán vai trò
  }, []);

  // Hàm xử lý đăng xuất
  const handleLogout = (event) => {
    event.preventDefault();
    // Xóa tất cả dữ liệu liên quan đến đăng nhập
    localStorage.removeItem("loggedIn");
    localStorage.removeItem("userRole");
    localStorage.removeItem("userInfo");
    setIsLoggedIn(false); // Cập nhật trạng thái đăng nhập
    setUserRole(null); // Cập nhật vai trò
    navigate("/"); // Điều hướng về trang chủ
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
                  {/* Hiển thị mục "Teacher" nếu vai trò là giáo viên */}
                  {userRole === 'teacher' && <Link to="/teacher">Teacher</Link>}
                  <Link to="/chatbot">Chat</Link>
                  {isLoggedIn ? (
                    <a href="#" onClick={handleLogout}>Logout</a>
                  ) : (
                    <Link to="/login">Login</Link>
                  )}
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
          {!isLoggedIn && <Link to="/login" className="cta-btn">Start Learning Now</Link>}
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
