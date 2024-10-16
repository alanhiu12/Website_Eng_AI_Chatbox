// src/components/HomePage.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import './HomePage.css'; // Đảm bảo bạn có file này

const HomePage = () => {
  const navigate = useNavigate(); // Hook để điều hướng giữa các trang
  const handleLoginClick = () => {
    navigate('/login'); // Điều hướng tới trang đăng nhập
  };

  return (
    <div>
      {/* Header */}
      <header>
        <div className="container">
          <a href="/" className="logo">LearnLinguaAI</a>
          <nav>
            <ul>
              <li><a href="/" className="active">Trang chủ</a></li>
              <li><a href="#" onClick={handleLoginClick}>Đăng nhập</a></li>
              <li><a href="#">Hỗ trợ</a></li>
              <li><a href="#">Liên hệ</a></li>
            </ul>
          </nav>
        </div>
        <div className="header-divider"></div> {/* Pixel divider under the header */}
      </header>

      {/* Hero Section */}
      <section id="hero">
        <h1>Hệ thống AI Chatbot hỗ trợ học tiếng Anh</h1>
        <p>Giới thiệu về những lợi ích của hệ thống và cách thức hỗ trợ người học tiếng Anh hiệu quả.</p>
        <a href="#" className="cta-btn" onClick={handleLoginClick}>Khám phá ngay</a>
      </section>

      {/* Features Section */}
      <section id="features">
        <div className="container">
          <h2>Các tính năng chính</h2>
          <div className="features-list">
            <div className="feature-item">
              <h3>Học tập cá nhân hóa</h3>
              <p>Các bài học và phản hồi được cá nhân hóa dựa trên khả năng của người học.</p>
            </div>
            <div className="feature-item">
              <h3>Hỗ trợ đa ngôn ngữ</h3>
              <p>Chatbot hỗ trợ người học qua nhiều ngôn ngữ khác nhau để giúp việc học dễ dàng hơn.</p>
            </div>
            <div className="feature-item">
              <h3>Đánh giá tiến bộ</h3>
              <p>Theo dõi tiến độ và cải thiện khả năng tiếng Anh thông qua hệ thống đánh giá tự động.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer>
        <p>&copy; 2024 LearnLinguaAI - Tất cả các quyền được bảo lưu.</p>
      </footer>
    </div>
  );
};

export default HomePage;
