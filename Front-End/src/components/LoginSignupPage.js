import React, { useState } from 'react';
import Header from './Header';
import Footer from './Footer';
import { useNavigate } from 'react-router-dom';
import './LoginSignupPage.css'; // Assuming you have the corresponding CSS file

const LoginSignupPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add validation and login logic here
    if (email === 'test@example.com' && password === 'password123') {
      navigate('/home'); // Redirect to home page on successful login
    } else {
      setError('Invalid email or password.');
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
          {error && <div className="error-message">{error}</div>}
          <button type="submit">Login</button>
        </form>

        <div className="extra-links">
          <p>
            <a href="/forgot-password" onClick={(e) => { e.preventDefault(); navigate('/forgot-password'); }}>
              Forgot Password?
            </a>
          </p>
          <p>
            Don’t have an account?{' '}
            <a href="/signup" onClick={(e) => { e.preventDefault(); navigate('/signup'); }}>
              Sign Up
            </a>
          </p>
        </div>
      </div>
      <Footer/>
    </div>
  );
}
export default LoginSignupPage;
