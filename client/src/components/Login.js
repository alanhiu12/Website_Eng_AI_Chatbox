import React, { useState } from 'react';
import Header from './Header';
import Footer from './Footer';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify'; // Import react-toastify
import 'react-toastify/dist/ReactToastify.css';
import './styles/Login.css';

const LoginSignupPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3500/login', {
        email,
        password,
      });
      if (response.status === 200) {
        toast.success('Đăng nhập thành công!', {
          position: "top-center",
          autoClose: 2000, // Đóng sau 2 giây
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
        });
        setTimeout(() => {
          navigate('/'); // Chuyển hướng sau khi hiển thị thông báo thành công
        }, 2000);
      }
    } catch (error) {
      toast.error('Tên tài khoản hoặc mật khẩu sai', {
        position: "top-center",
        autoClose: 2000, // Đóng sau 2 giây
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
      });
    }
  };

  return (
    <div className="login-signup-page">
      <Header />
      <div className="form-container">
        <h2>Đăng nhập</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-field">
            <label>Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="form-field">
            <label>Mật khẩu</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit">Đăng nhập</button>
        </form>

        <div className="extra-links">
          <p>
            <a href="/forgot-password" onClick={(e) => { e.preventDefault(); navigate('/forgot-password'); }}>
              Quên mật khẩu?
            </a>
          </p>
          <p>
            Chưa có tài khoản?{' '}
            <a href="/signup" onClick={(e) => { e.preventDefault(); navigate('/signup'); }}>
              Đăng ký
            </a>
          </p>
        </div>
      </div>
      <Footer />
      <ToastContainer />
    </div>
  );
}

export default LoginSignupPage;
