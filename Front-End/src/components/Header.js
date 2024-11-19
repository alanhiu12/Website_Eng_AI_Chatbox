import React from 'react';
import { useNavigate } from 'react-router-dom';  // Import useNavigate
import './styles/Header.css';

const Header = () => {
  const navigate = useNavigate();  // Initialize useNavigate

  const goHome = () => {
    navigate('/');  // Redirect to the home page
  };

  return (
    <header className="login-header">
      <div className="container">
        <h1 className="logo" onClick={goHome}>LearnLinguaAI</h1>  {/* Make logo clickable */}
      </div>
    </header>
  );
};

export default Header;
