import React from 'react';
import { Link } from 'react-router-dom';  // Make sure this line is correct
import './styles/Header.css';

const Header = () => {
  return (
    <header className="login-header">
      <div className="container">
        <h1>
          <Link to="/" className="logos">LearnLinguaAI</Link>
        </h1>
      </div>
    </header>
  );
};

export default Header;
