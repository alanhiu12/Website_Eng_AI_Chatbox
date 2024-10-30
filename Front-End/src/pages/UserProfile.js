import React from 'react';
import { Link } from 'react-router-dom';
import ProgressDashboard from '../components/ProgressDashboard';
import profileImage from '../assets/pictures/huohuo.jpg';
import './css/UserProfile.css';

const UserProfile = () => {
  const user = {
    name: 'Trinh Hieu',
    time: 'June 2024',
    progress: '80%',
  };

  return (
    <div>
      <header>
        <div className="container">
          <Link to="/" className="logo">LearnLinguaAI</Link>
          <nav>
            <ul>
              <li><Link to="/">Home</Link></li>
              <li><Link to="/classes">Classes</Link></li>
              <li><Link to="/about">About</Link></li>
              <li className="dropdown">
                <Link to="#" className="dropbtn">See More</Link>
                <div className="dropdown-content">
                  <Link to="/user-profile">Profile</Link>
                  <Link to="/contact">Contact</Link>
                  <Link to="/setting">Setting</Link>
                  <Link to="#" id="logout-link">Logout</Link>
                </div>
              </li>
            </ul>
          </nav>
        </div>
      </header>

      <h1>User Profile</h1>
      <div className="profile-info">
        <img src={profileImage} alt="Profile" className="profile-image" />
        <h2>{user.name}</h2>
        <p>Joined : {user.time}</p>
        <p>Learning Progress: {user.progress}</p>
      </div>

      <ProgressDashboard />
      <footer>
                <div className="container">
                    <p>&copy; 2024 LearnLinguaAI. All Rights Reserved.</p>
                </div>
            </footer>
    </div>
  );
};

export default UserProfile;
