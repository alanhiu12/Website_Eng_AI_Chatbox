import React, { useState, useEffect } from 'react';
import Header from './Header';
import Footer from './Footer';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './styles/Login.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  // Kiểm tra khi trang tải lại nếu đã có thông tin đăng nhập
  useEffect(() => {
    const isLoggedIn = localStorage.getItem('user');
    if (isLoggedIn) {
      navigate('/');  // Nếu đã đăng nhập, điều hướng ngay đến trang HomePage
    }
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Kiểm tra tài khoản Admin
    if (email === 'Admin@gmail.com' && password === '25820042004') {
      toast.success('Đăng nhập Admin thành công!', {
        position: 'top-center',
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
      });

      // Lưu trạng thái Admin vào localStorage
      localStorage.setItem('userRole', 'admin');
      localStorage.setItem('user', JSON.stringify({ email, role: 'admin' }));

      setTimeout(() => {
        navigate('/admin'); // Điều hướng đến trang Admin
      }, 2000);
    } else {
      try {
        // Kiểm tra tài khoản từ server
        const response = await axios.post('http://localhost:3500/login', {
          email,
          password,
        });

        if (response.status === 200) {
          const user = response.data.user;
          localStorage.setItem('userRole', user.role); // Lưu vai trò người dùng
          localStorage.setItem('user', JSON.stringify(user)); // Lưu thông tin người dùng

          toast.success('Login success!', {
            position: "top-center",
            autoClose: 2000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
          });

          setTimeout(() => {
            navigate('/home'); // Điều hướng đến trang chủ cho cả giáo viên và học sinh
          }, 2000);
        }
      } catch (error) {
        toast.error('Incorrect username or password', {
          position: "top-center",
          autoClose: 2000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
        });
      }
    }
  };

  return (
    <div className="login-signup-page">
      <Header />
      <div className="form-container">
        <h2>Login</h2>
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
            <label>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit">Login</button>
        </form>

        <div className="extra-links">
          <p>
            <a href="/forgot-password" onClick={(e) => { e.preventDefault(); navigate('/forgot-password'); }}>
              Forgot password?
            </a>
          </p>
          <p>
            Don't have an account?{' '}
            <a href="/signup" onClick={(e) => { e.preventDefault(); navigate('/signup'); }}>
              Signup
            </a>
          </p>
        </div>
      </div>
      <Footer />
      <ToastContainer />
    </div>
  );
};

export default Login;
