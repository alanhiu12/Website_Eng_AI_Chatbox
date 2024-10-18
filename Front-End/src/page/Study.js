import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './css/Study.css'; // Import your CSS file

const Study = () => {
    const [quizResult, setQuizResult] = useState('');
    const [lessons, setLessons] = useState([
        { title: 'Basic Grammar', description: 'Learn the essential grammar rules.' },
        { title: 'Intermediate Vocabulary', description: 'Expand your vocabulary with intermediate words.' },
        { title: 'Advanced Phrases', description: 'Master advanced phrases for conversation.' },
        { title: 'Pronunciation Tips', description: 'Improve your English pronunciation.' }
    ]);
    const [newLessonTitle, setNewLessonTitle] = useState('');
    const [newLessonDescription, setNewLessonDescription] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    // Function to handle quiz answer checking
    const checkAnswer = (answer) => {
        setQuizResult(answer === 'run' ? 'Correct!' : 'Try again!');
    };

    // Function to handle new lesson submission
    const addLesson = (e) => {
        e.preventDefault();
        const newLesson = { title: newLessonTitle, description: newLessonDescription };
        setLessons((prevLessons) => [...prevLessons, newLesson]);
        setNewLessonTitle('');
        setNewLessonDescription('');
        setSuccessMessage('Lesson added successfully!');
        
        // Clear the success message after 3 seconds
        setTimeout(() => setSuccessMessage(''), 3000);
    };

    return (
        <div>
            {/* Header */}
            <header>
                <div className="container">
                    <Link to="/" className="logo">LearnLinguaAI</Link>
                    <nav>
                        <ul>
                            <li><Link to="/">Home</Link></li>
                            <li><Link to="/study" className="active">Exercises</Link></li>
                            <li><Link to="/about" >About</Link></li>
                            <li className="dropdown">
                                <a href="#" className="dropbtn">See More</a>
                                <div className="dropdown-content">
                                    <Link to="/user-profile">Profile</Link>
                                    <Link to="/contact">Contact</Link>
                                    <Link to="/setting">Setting</Link>
                                    <a href="#" id="logout-link">Logout</a>
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
                        {lessons.map((lesson, index) => (
                            <div className="lesson-box" key={index}>
                                <h3>{lesson.title}</h3>
                                <p>{lesson.description}</p>
                                <button onClick={() => alert(`Navigating to ${lesson.title} lesson`)}>Start Lesson</button>
                            </div>
                        ))}
                    </div>
                </section>

                <section id="add-lesson-section">
                    <h2>Add a New Lesson</h2>
                    <form id="add-lesson-form" onSubmit={addLesson}>
                        <label htmlFor="lesson-title">Lesson Title:</label>
                        <input
                            type="text"
                            id="lesson-title"
                            name="lesson-title"
                            value={newLessonTitle}
                            onChange={(e) => setNewLessonTitle(e.target.value)}
                            placeholder="Enter lesson title"
                            required
                        />

                        <label htmlFor="lesson-description">Lesson Description:</label>
                        <textarea
                            id="lesson-description"
                            name="lesson-description"
                            value={newLessonDescription}
                            onChange={(e) => setNewLessonDescription(e.target.value)}
                            placeholder="Enter lesson description"
                            required
                        />

                        <button type="submit">Add Lesson</button>
                    </form>
                    {successMessage && (
                        <div id="lesson-success-message" style={{ color: 'green' }}>
                            {successMessage}
                        </div>
                    )}
                </section>

                {/* Footer */}
                <footer>
                    <div className="container">
                        <p>&copy; 2024 LearnLinguaAI. All Rights Reserved.</p>
                    </div>
                </footer>
            </main>
        </div>
    );
};

export default Study;
