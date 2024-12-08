import React from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Thêm import Link
import TeacherAnnouncement from './TeacherAnnouncement'; // Import component chat
import './css/TeacherContentPage.css';

const TeacherContentPage = () => {
    const navigate = useNavigate();

    return (
        <div>
            {/* Header */}
            <header className='Header'>
                <div className="container">
                    <Link to="/home" className="logo">LearnLinguaAI</Link>
                    <nav>
                        <ul>
                            <li><Link to="/home">Home</Link></li>
                            <li><Link to="/teacher" className="active">Teacher</Link></li>
                            <li><Link to="/quiz">QuizAi</Link></li>
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

            {/* Main Content */}
            <div className="Teacher-content-page">
                <main>
                    <h1>Welcome, Teacher</h1>
                    <p className="description">Easily give feedback and see your student Assignment materials here.</p>

                    {/* Button: Navigate to "Student Assignments" */}
                    <div className="button-container">
                        <button onClick={() => navigate("/teacherreceive")} className="back-button">
                            View Student Assignments
                        </button>
                    </div>

                    {/* Thêm thanh chat */}
                    <TeacherAnnouncement />
                </main>
            </div>
        </div>
    );
};

export default TeacherContentPage;
