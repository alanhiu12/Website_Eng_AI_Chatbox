import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './css/Dictionary.css';

const StudyLesson = () => {
    const navigate = useNavigate();
    const [isLoggedIn, setIsLoggedIn] = useState(false); // Trạng thái đăng nhập
    const [userRole, setUserRole] = useState(null); // Vai trò người dùng

    useEffect(() => {
        // Lấy trạng thái đăng nhập và vai trò từ localStorage
        const loggedInStatus = localStorage.getItem("loggedIn");
        const role = localStorage.getItem("userRole");
        setIsLoggedIn(loggedInStatus === "true");
        setUserRole(role);
    }, []);

    const [vocabulary, setVocabulary] = useState('');
    const [responseText, setResponseText] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    // Function to handle vocabulary query
    const handleVocabularySearch = async () => {
        if (!vocabulary) {
            alert('Please enter a word to define.');
            return;
        }

        setIsLoading(true);
        try {
            const response = await fetch('http://localhost:5000/api/chat', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    messages: [{ content: `define ${vocabulary}` }]
                })
            });

            const data = await response.json();

            if (data.text) {
                setResponseText(data.text.trim());
            } else {
                setResponseText('No explanation available for this word.');
            }
        } catch (error) {
            console.error('Error fetching vocabulary explanation:', error);
            setResponseText('An error occurred while fetching the explanation.');
        }
        setIsLoading(false);
    };

    // Update the vocabulary value when the user types in the input
    const handleVocabularyChange = (e) => {
        setVocabulary(e.target.value);
    };

    return (
        <div>
            <header className='Header'>
                <div className="container">
                    <a href="/home" className="logo">LearnLinguaAI</a>
                    <nav>
                        <ul>
                            <li><a href="/home">Home</a></li>
                            <li>{userRole === 'student' && <Link to="/classes">Classes</Link>}</li>
                            <li><a href="/dictionary" className="active">Dictionary</a></li>
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

            <main>
                <section id="lesson-intro">
                    <h1>Welcome to the English Dictionary</h1>
                </section>

                <section id="vocabulary-section">
                    <h2>Enhance your vocabulary with detailed explanations and examples.</h2>
                    <h3>Enter a Word to Get Its Definition</h3>
                    <div className="input-group">
                        <input
                            type="text"
                            value={vocabulary}
                            onChange={handleVocabularyChange}
                            placeholder="Enter the word you want to define"
                        />
                        <button onClick={handleVocabularySearch} disabled={isLoading}>
                            {isLoading ? 'Loading...' : 'Get Definition'}
                        </button>
                    </div>
                </section>

                {responseText && (
                    <section id="vocabulary-explanation">
                        <h3>Explanation for "{vocabulary}"</h3>
                        <div className="explanation-card">
                            {responseText.split('\n').map((line, index) => (
                                <p key={index}>{line}</p>
                            ))}
                        </div>
                    </section>
                )}
            </main>
        </div>
    );
};

export default StudyLesson;
