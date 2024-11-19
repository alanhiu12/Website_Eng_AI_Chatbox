import React, { useState } from 'react';
import Header from './Header';
import Footer from './Footer';
import { useNavigate } from 'react-router-dom';
import './styles/Login.css'; // Đảm bảo bạn đã tạo tệp Login.css

const LoginPage = () => {
  const [loginMethod, setLoginMethod] = useState('user'); // user: Student & Teacher, admin: Admin
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleMethodChange = (method) => {
    setLoginMethod(method);
    setError(''); // Xóa thông báo lỗi khi chuyển phương thức
    setEmail('');
    setPassword('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Logic đăng nhập mẫu
    if (loginMethod === 'user') {
      if (email === 'user@example.com' && password === 'password') {
        navigate('/homepage'); // Điều hướng tới homepage sau khi login thành công
      } else {
        setError('Invalid email or password for User login.');
      }
    } else if (loginMethod === 'admin') {
      if (email === 'admin@example.com' && password === 'admin123') {
        navigate('/'); // Điều hướng tới homepage sau khi login thành công
      } else {
        setError('Invalid email or password for Admin login.');
      }
    }
  };

  return (
   <div className='catrang'>
   <div className="login-page">
      <Header />
      
   
      <div className="method-toggle">
        <button
          className={loginMethod === 'user' ? 'active' : ''}
          onClick={() => handleMethodChange('user')}
        >
          Student & Teacher
        </button>
        <button
          className={loginMethod === 'admin' ? 'active' : ''}
          onClick={() => handleMethodChange('admin')}
        >
          Admin
        </button>
      </div>
      <div className="form-container">
        
        <h2>{loginMethod === 'user' ? 'Login for Student & Teacher' : 'Login for Admin'}</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-field">
            <label>Email</label>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="form-field">
            <label>Password</label>
            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          {error && <div className="error-message">{error}</div>}
          <button type="submit" className="login-button">
            Login
          </button>
          <div className="extra-links">
            <p>
              <a
                href="/forgot-password"
                onClick={(e) => {
                  e.preventDefault();
                  navigate('/forgot-password');
                }}
              >
                Forgot Password?
              </a>
            </p>
            <p>
              Don’t have an account?{' '}
              <a
                href="/signup"
                onClick={(e) => {
                  e.preventDefault();
                  navigate('/signup');
                }}
              >
                Sign Up
              </a>
            </p>
          </div>
        </form>
      </div>
      </div>
      
    </div>


  );
};

export default LoginPage;
