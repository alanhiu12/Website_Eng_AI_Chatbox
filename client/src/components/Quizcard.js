// QuizCard.js
import React from 'react';
import './styles/Quizcard.css';

const QuizCard = ({ title, questions, plays, image }) => {
    return (
        <div className="quiz-card">
            <img src={image} alt={title} className="quiz-image" />
            <div className="quiz-info">
                <p className="quiz-title">{title}</p>
                <p className="quiz-questions">{questions} Qs</p>
                <p className="quiz-plays">{plays} plays</p>
            </div>
        </div>
    );
};

export default QuizCard;
