import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './css/AdminDashboard.css'; // Import the CSS module
import img1 from '../assets/pictures/like.png';
import img2 from '../assets/pictures/comment.png';
import img3 from '../assets/pictures/share.png';
import img4 from '../assets/pictures/find.png';

// Updated data structure
const activityData = [
    { name: "Prem Shahi", email: "premshahi@gmail.com", joined: "2022-02-12", type: "New", status: "Liked" },
    { name: "Deepa Chand", email: "deepachand@gmail.com", joined: "2022-02-12", type: "Member", status: "Liked" },
    { name: "Manisha Chand", email: "prakashhai@gmail.com", joined: "2022-02-13", type: "Member", status: "Liked" },
    { name: "Pratima Shahi", email: "manishachand@gmail.com", joined: "2022-02-13", type: "New", status: "Liked" },
    { name: "Man Shahi", email: "pratimashhai@gmail.com", joined: "2022-02-14", type: "Member", status: "Liked" },
    { name: "Ganesh Chand", email: "manshahi@gmail.com", joined: "2022-02-14", type: "New", status: "Liked" },
    { name: "Bikash Chand", email: "ganeshchand@gmail.com", joined: "2022-02-15", type: "Member", status: "Liked" }
];

// ActivityData component
const ActivityData = () => {
    return (
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
                {activityData.map((activity, index) => (
                    <tr key={index}>
                        <td>{activity.name}</td>
                        <td>{activity.email}</td>
                        <td>{activity.joined}</td>
                        <td>{activity.type}</td>
                        <td>{activity.status}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

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

                {/* Search Bar and Profile Icon */}
                <div className="header">
                        <input type="text" placeholder="Search"  className="search-bar" />
                        <div className="profile-icon">
                            <img src={img4} alt="Profile" />
                        </div>
                </div>

            {/* Dashboard Summary Section */}
            <div className="dashboard-section">
                <div className="card">
                    <img src={img1} classname="img"/>
                    <i className="fas fa-thumbs-up icon"></i>
                    <p>Total Likes</p>
                    <h2>50,120</h2>
                </div>
                <div className="card">
                <img src={img2} classname="img"/>
                    <i className="fas fa-comments icon"></i>
                    <p>Comments</p>
                    <h2>20,120</h2>
                </div>
                <div className="card">
                <img src={img3} classname="img"/>
                    <i className="fas fa-share icon"></i>
                    <p>Total Share</p>
                    <h2>10,120</h2>
                </div>
            </div>
    
            {/* Recent Activity Section */}
            <div className="recent-activity">
                <h3>Recent Activity</h3>
                <ActivityData /> {/* Render ActivityData component */}
            </div>

            <footer>
                <div className="container">
                    <p>&copy; 2024 LearnLinguaAI. All Rights Reserved.</p>
                </div>
            </footer>
        </div>
    );
};

export default AdminDashboard;
