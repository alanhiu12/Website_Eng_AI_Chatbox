import './css/ChatbotPage.css'; // Để thêm các kiểu tùy chỉnh
import { Link, useNavigate } from 'react-router-dom';
import React, { useState, useEffect } from "react";

const ChatbotPage = () => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Trạng thái đăng nhập
  const [userRole, setUserRole] = useState(null); // Vai trò người dùng

  useEffect(() => {
    // Lấy trạng thái đăng nhập và vai trò từ localStorage
    const loggedInStatus = localStorage.getItem("loggedIn");
    const role = localStorage.getItem("userRole");
    setIsLoggedIn(loggedInStatus === "true");
    setUserRole(role);
  }, []);

  // Hàm xử lý đăng xuất
  const handleLogout = (event) => {
    event.preventDefault();
    localStorage.removeItem("loggedIn");
    localStorage.removeItem("userRole");
    localStorage.removeItem("userInfo");

    setIsLoggedIn(false); // Cập nhật trạng thái
    setUserRole(null); // Xóa vai trò

    navigate("/login"); // Chuyển hướng đến trang đăng nhập
  };
  return (
  <div>
          <header className='Header'>
        <div className="container">
          <Link to="/home" className="logo">LearnLinguaAI</Link>
          <nav>
            <ul>
              <li><Link to="/home" >Home</Link></li>
              <li>{userRole === 'student' && <Link to="/classes">Classes</Link>}</li>
              <li>{userRole === 'teacher' && <Link to="/teacher">Teacher</Link>}</li>
              <li><Link to="/about">About</Link></li>
              <li className="dropdown">
                <a href="#" className="dropbtn">See More</a>
                <div className="dropdown-content">
                  <Link to="/contact">Contact</Link>
                  <Link to="/setting">Setting</Link>
                  {/* Hiển thị mục "Teacher" nếu vai trò là giáo viên */}
                  <Link to="/chatbot">Chat</Link>

                </div>
              </li>
            </ul>
          </nav>
        </div>
      </header>
    <div className="chatbot-container">
      <iframe
        src="https://www.chatbase.co/chatbot-iframe/WqpEHCHu7nrwmQ1VjPBDX"
        width="100%"
        style={{ height: "100%", minHeight: "700px" }}
        frameBorder="0"
        title="Chatbot"
      ></iframe>
    </div>
  </div>
  );
};

export default ChatbotPage;
