import React, { useState } from 'react';
import './css/Study.css';
import { Link } from 'react-router-dom';

const StudyLesson = () => {
    const [quizResult, setQuizResult] = useState('');
    const [lessonSuccess, setLessonSuccess] = useState(false);

    const checkAnswer = (answer) => {
        if (answer === 'run') {
            setQuizResult('Correct!');
        } else {
            setQuizResult('Try again.');
        }
    };

    const handleLogout = () => {
        alert("You have logged out.");
        window.location.href = "/";
    };

    return (
        <div>
            <header>
                <div className="container">
                    <a href="/" className="logo">LearnLinguaAI</a>
                    <nav>
                        <ul>
                            <li><a href="/">Home</a></li>
                            <li><a href="/study" className="active">Learn</a></li>
                            <li><a href="/about">About</a></li>
                            <li className="dropdown">
                                <a href="#" className="dropbtn">See More</a>
                                <div className="dropdown-content">
                                    <a href="/user-profile">Profile</a>
                                    <a href="/contact">Contact</a>
                                    <a href="/setting">Setting</a>
                                    <a href="#" onClick={handleLogout} id="logout-link">Logout</a>
                                </div>
                            </li>
                        </ul>
                    </nav>
                </div>
            </header>

            <main>
                <section id="lesson-intro">
                    <h2>Welcome to Your English Study</h2>
                    <p>Today's lesson covers basic grammar and vocabulary.</p>
                </section>

                <section id="vocabulary-section">
                    <h2>Vocabulary</h2>
                    <ul id="vocabulary-list">
                        <li><span>Apple</span>: A fruit.</li>
                        <li><span>Book</span>: A collection of written words.</li>
                        <li><span>Run</span>: To move swiftly on foot.</li>
                    </ul>
                </section>

                <section id="quiz-section">
                    <h2>Quick Quiz</h2>
                    <p>Match the words with their meanings:</p>
                    <div id="quiz">
                        <p>1. Which word means "to move swiftly on foot"?</p>
                        <button onClick={() => checkAnswer('run')}>Run</button>
                        <button onClick={() => checkAnswer('apple')}>Apple</button>
                        <button onClick={() => checkAnswer('book')}>Book</button>
                        <p id="quiz-result">{quizResult}</p>
                    </div>
                </section>

                <section id="other-lessons">
                    <h2>Other English Lessons You Can Learn</h2>
                    <div className="lesson-grid" id="lesson-grid">
                        <div className="lesson-box">
                            <h3>Basic Grammar</h3>
                            <p>Learn the essential grammar rules.</p>
                            <Link to="/basic-grammar"><button>Start Lesson</button></Link>
                        </div>
                        <div className="lesson-box">
                            <h3>Intermediate Vocabulary</h3>
                            <p>Expand your vocabulary with intermediate words.</p>
                            <Link to="/intermediate-vocabulary"><button>Start Lesson</button></Link>
                        </div>
                        <div className="lesson-box">
                            <h3>Advanced Phrases</h3>
                            <p>Master advanced phrases for conversation.</p>
                            <Link to="/advanced-phrases"><button>Start Lesson</button></Link>
                        </div>
                        <div className="lesson-box">
                            <h3>Pronunciation Tips</h3>
                            <p>Improve your English pronunciation.</p>
                            <Link to="/pronunciation-tips"><button>Start Lesson</button></Link>
                        </div>
                    </div>
                </section>
            </main>

            <footer>
                <div className="container">
                    <p>&copy; 2024 LearnLinguaAI. All Rights Reserved.</p>
                </div>
            </footer>
        </div>
    );
};

export default StudyLesson;
