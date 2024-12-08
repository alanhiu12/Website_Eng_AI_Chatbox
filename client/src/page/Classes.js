import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './css/Classes.css'; // Import CSS for styling
import huohuoImage from '../assets/pictures/Class.png';

const ClassPage = () => {
    const navigate = useNavigate();
    // Navigate to Study page
    const handleJoinClass = () => {
        navigate("/noticeboard"); // Redirect to study page
    };

    return (
        <div>
            <header className='Header'>
                <div className="container">
                    <Link to="/home" className="logo">LearnLinguaAI</Link>
                    <nav>
                        <ul>
                            <li><Link to="/home">Home</Link></li>
                            <li><Link to="/classes" className="active">Classes</Link></li>
                            <li><a href="/dictionary">Dictionary</a></li>
                            <li className="dropdown">
                                <a href="#" className="dropbtn">See More</a>
                                <div className="Dropdown-content">
                                    <Link to="/contact">Contact</Link>
                                    <Link to="/setting">Setting</Link>
                                    <Link to="/chatbot">Chat</Link>
                                </div>
                            </li>
                        </ul>
                    </nav>
                </div>
            </header>

            <main className="main-content">
                <div className="empty-state">
                    <img src={huohuoImage} alt="Empty state" className="empty-image" />
                    <h2>You haven’t joined any classes yet.</h2>
                    <button className="join-class-button" onClick={handleJoinClass}>
                        Join a Class
                    </button>
                </div>
            </main>

            <footer>
                <div className="container">
                    <p>&copy; 2024 LearnLinguaAI. All Rights Reserved.</p>
                </div>
            </footer>
        </div>
    );
};

export default ClassPage;
