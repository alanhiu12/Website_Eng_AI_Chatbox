import React from 'react';
import { Link, useNavigate} from 'react-router-dom';
import ProgressDashboard from '../components/ProgressDashboard';
import profileImage from '../assets/pictures/huohuo.jpg';
import './css/UserProfile.css';

const UserProfile = () => {
  const user = {
    name: 'Trinh Hieu',
    time: 'June 2024',
    progress: '80%',
    
  };
  const navigate = useNavigate();
  const handleLogout = (event) => {
    event.preventDefault();
    localStorage.removeItem("loggedIn");
    navigate("/login"); // Redirect to login pages after logout
  };

  

  return (
    <div>
     <header className="header">
  <div className="container">
    <Link to="/" className="logo">LearnLinguaAI</Link>
    <nav className="homepage-nav">
      <ul>
        <li><Link to="/" >Home</Link></li>
        <li><Link to="/classes">Classes</Link></li>
        <li><Link to="/chatbot">Chat</Link></li>
        <li><Link to="/payment">Payment</Link></li>
        <li className="dropdown">
          <a href="#" className="dropbtn">See More</a>
          <div className="dropdown-content">
            <Link to="/admin">Admin</Link>
            <Link to="/user-profile" className="active" >Profile</Link>
            <Link to="/contact">Contact</Link>
            <Link to="/setting">Setting</Link>
            <Link to="/teacher">Teacher</Link>
            <a href="#" onClick={handleLogout}>Logout</a>
          </div>
        </li>
      </ul>
    </nav>
  </div>
</header>
      <div className='tonhtheuser'>
      <div className="Users-info">
        <div className="profile-info">
          <h1>User Profile</h1>
            <img src={profileImage} alt="Profile" className="profile-image" />
        </div>
          <div class="user-profile-info">
            <h2 class="user-profile-name">Name: {user.name}</h2>
            <p class="user-profile-joined">Joined: {user.time}</p>
            <p class="user-profile-progress">Learning Progress: {user.progress}</p>
          </div>
          
      </div>
      <ProgressDashboard />
      </div>
  
      <footer>
                <div className="container">
                    <p>&copy; 2024 LearnLinguaAI. All Rights Reserved.</p>
                </div>
            </footer>
    </div>
  );
};

export default UserProfile;
