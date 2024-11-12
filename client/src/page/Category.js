// Category.js
import React from 'react';
import QuizCard from '../components/Quizcard';// If you have a setup supporting absolute imports
import './css/Category.css';
import huohuoImage from '../assets/pictures/huohuo.jpg';
import study_image from '../assets/pictures/study_image1.jpg';
import study_image2 from '../assets/pictures/study_picture2.jpg';
import study_image3 from '../assets/pictures/home.png';
import study_image4 from '../assets/pictures/English_pic.jpg';





// Same for CSS
const Category = ({ title }) => {
    const quizData = {
        "Ice Breaker": [
            { title: "Getting to Know You", questions: 5, plays: "50k", image: huohuoImage },
            { title: "Two Truths and a Lie", questions: 8, plays: "32k", image: study_image },
            { title: "Favorite Things", questions: 6, plays: "45k", image: study_image2 },
            { title: "Hobbies & Interests", questions: 10, plays: "20k", image: study_image3 },
            { title: "Would You Rather", questions: 7, plays: "28k", image: study_image4 },
        ],
        "Math": [
            { title: "Basic Arithmetic", questions: 10, plays: "120k", image: huohuoImage },
            { title: "Algebra 101", questions: 12, plays: "95k", image: huohuoImage },
            { title: "Geometry Fun", questions: 15, plays: "80k", image: huohuoImage },
            { title: "Fractions & Decimals", questions: 10, plays: "60k", image: huohuoImage },
            { title: "Word Problems", questions: 8, plays: "75k", image: huohuoImage },
        ]
    };

    return (
        <div className="category">
            <h2>{title}</h2>
            <div className="quiz-cards">
                {quizData[title]?.map((quiz, index) => (
                    <QuizCard
                        key={index}
                        title={quiz.title}
                        questions={quiz.questions}
                        plays={quiz.plays}
                        image={quiz.image}
                    />
                ))}
            </div>
        </div>
    );
};

export default Category;
