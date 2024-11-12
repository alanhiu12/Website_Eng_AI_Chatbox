import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './css/AdminDashboard.css'; //Import the CSS module

const AdminDashboard = () => {
    const navigate = useNavigate();

    // Logout functionality
  const handleLogout = (event) => {
    event.preventDefault();
    localStorage.removeItem("loggedIn");
    navigate("/login"); // Redirect to login pages after logout
  };

    return (
      <div className="admin-dashboard">
        {/* Search Bar and Profile Icon */}
        <div className="header">
          <input type="text" placeholder="Search" className="search-bar" />
          <div className="profile-icon"> {/* Placeholder for profile icon */}
            <img src="profile-pic-url" alt="Profile" />
          </div>
        </div>
        
        <header>
        <div className="container">
          <Link to="/" className="logo">LearnLinguaAI</Link>
          <nav>
            <ul>
              <li><Link to="/" className="active">Home</Link></li>
              <li><Link to="/classes">Classes</Link></li>
              <li><Link to="/about">About</Link></li>
              <li className="dropdown">
                <a href="#" className="dropbtn">See More</a>
                <div className="dropdown-content">
                  <Link to="/user-profile">Profile</Link>
                  <Link to="/admin">Admin</Link>
                  <Link to="/contact">Contact</Link>
                  <Link to="/setting">Setting</Link>
                  <Link to="/teacher">Teacher</Link>
                  <Link to="/chatbot">Chat</Link>
                  <a href="#" onClick={handleLogout}>Logout</a>
                </div>
              </li>
            </ul>
          </nav>
        </div>
      </header>

        {/* Dashboard Summary Section */}
        <div className="dashboard-section">
          <div className="card">
            <i className="fas fa-thumbs-up"></i>
            <p>Total Likes</p>
            <h2>50,120</h2>
          </div>
          <div className="card">
            <i className="fas fa-comments"></i>
            <p>Comments</p>
            <h2>20,120</h2>
          </div>
          <div className="card">
            <i className="fas fa-share"></i>
            <p>Total Share</p>
            <h2>10,120</h2>
          </div>
        </div>
  
        {/* Recent Activity Table */}
        <div className="recent-activity">
          <h3>Recent Activity</h3>
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Joined</th>
                <th>Type</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Prem Shahi</td>
                <td>premshahi@gmail.com</td>
                <td>2022-02-12</td>
                <td>New</td>
                <td>Liked</td>
              </tr>
              <tr>
                <td>Deepa Chand</td>
                <td>deepachand@gmail.com</td>
                <td>2022-02-12</td>
                <td>Member</td>
                <td>Liked</td>
              </tr>
              {/* Add more rows as needed */}
            </tbody>
          </table>

        <footer>
        <div className="container">
          <p>&copy; 2024 LearnLinguaAI. All Rights Reserved.</p>
        </div>
      </footer>

        </div>
      </div>
    );
  };
  
export default AdminDashboard;
