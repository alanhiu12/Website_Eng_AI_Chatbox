import React, { useState } from 'react';
import Header from './Header';
import Footer from './Footer';
import { useNavigate } from 'react-router-dom';
import './styles/Login.css';

const LoginPage = () => {
  const [loginMethod, setLoginMethod] = useState('user'); // user: Student & Teacher, admin: Admin
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleMethodChange = (method) => {
    setLoginMethod(method);
    setError(''); // Clear error on method switch
    setEmail('');
    setPassword('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Mock Login Logic
    if (loginMethod === 'user') {
      if (email === 'user@example.com' && password === 'password') {
        navigate('/'); // Redirect on successful login
      } else {
        setError('Invalid email or password for User login.');
      }
    } else if (loginMethod === 'teacher') {
      if (email === 'teacher@example.com' && password === 'teacher123') {
        navigate('/'); // Adjust redirect URL for admin
      } else {
        setError('Invalid email or password for Admin login.');
      }
    }
  };

  return (
    <div className="login-page">
      <Header />
      <div className="login-container">
        <div className="method-toggle">
          <button
            className={loginMethod === 'user' ? 'active' : ''}
            onClick={() => handleMethodChange('user')}
          >
            Student
          </button>
          <button
            className={loginMethod === 'teacher' ? 'active' : ''}
            onClick={() => handleMethodChange('teacher')}
          >
            Teacher   
          </button>
        </div>
        <div className="form-container">
          <h2>
            {loginMethod === 'user'
              ? 'Login for Student'
              : 'Login for Teacher'}
          </h2>
          <form onSubmit={handleSubmit}>
            <div className="form-field">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                aria-label="Email"
              />
            </div>
            <div className="form-field">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                aria-label="Password"
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
      <Footer />
    </div>
  );
};

export default LoginPage;
