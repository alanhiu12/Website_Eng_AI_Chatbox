import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import ChatBubble from '../components/ChatBubble';
import anh12 from "../assets/pictures/personalizedLearning.jpg";
import anh11 from "../assets/pictures/anh11.png"
import anh13 from "../assets/pictures/anh13.webp"
import anh14 from "../assets/pictures/anh14.webp"
import anh15 from "../assets/pictures/anh15.webp"
import anh16 from "../assets/pictures/signin.png"
import anh17 from "../assets/pictures/anh17.png"
import anh18 from "../assets/pictures/gai1.jpg"
import anh19 from "../assets/pictures/gai2.jpg"
import anh20 from "../assets/pictures/trai1.png"
import anh21 from "../assets/pictures/trai2.png"
import anh22 from "../assets/pictures/anh22.png"
import './css/HomePage.css';

const Home = () => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Trạng thái đăng nhập
  const [userRole, setUserRole] = useState(null); // Vai trò người dùng
  const [currentIndex, setCurrentIndex] = useState(0); // Quản lý bình luận hiện tại
  const [isAnimating, setIsAnimating] = useState(false);
  useEffect(() => {
    // Lấy trạng thái đăng nhập và vai trò từ localStorage
    const loggedInStatus = localStorage.getItem("loggedIn");
    const role = localStorage.getItem("userRole");
    setIsLoggedIn(loggedInStatus === "true");
    setUserRole(role);
  }, []);
  const testimonials = [
    {
      quote: "LearnLinguaAI has completely transformed the way I learn languages. The AI recommendations are spot-on!",
      name: "Jane Doe",
      img: anh18,
    },
    {
      quote: "The interactive exercises are so engaging, and the feedback helps me improve quickly!",
      name: "Son Pham",
      img: anh20,
    },
    {
      quote: "I love the personalized learning plans. They keep me motivated and on track!",
      name: "Emily White",
      img: anh19,
    },
    {
      quote: "The interactive exercises and instant feedback make learning so much fun!",
      name: "John Smith",
      img: anh21,
    }
  ];
  const handlePrev = () => {
    if (isAnimating) return; // Tránh click khi animation đang chạy
    setIsAnimating(true);
    setTimeout(() => {
      setCurrentIndex((prevIndex) =>
        (prevIndex - 1 + testimonials.length) % testimonials.length
      );
      setIsAnimating(false);
    }, 50); // Thời gian khớp với transition CSS
  };

  const handleNext = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setTimeout(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
      setIsAnimating(false);
    }, 50);
  };

  // Hàm xử lý đăng xuất
  const handleLogout = (event) => {
    event.preventDefault();
    localStorage.removeItem("loggedIn");
    localStorage.removeItem("userRole");
    localStorage.removeItem("userInfo");

    setIsLoggedIn(false); // Cập nhật trạng thái
    setUserRole(null); // Xóa vai trò

    navigate("/login"); // Chuyển hướng đến trang đăng nhập
  };

  return (
    <div>
      <header className='Header'>
        <div className="container">
          <Link to="/home" className="logo">LearnLinguaAI</Link>
          <nav>
            <ul>   
              <li><Link to="/home" className="active">Home</Link></li>
              <li>{userRole === 'student' && <Link to="/classes">Classes</Link>}</li>
              <li>{userRole === 'student' && <Link to="/dictionary">Dictionary</Link>}</li>
              <li>{userRole === 'teacher' && <Link to="/teacher">Teacher</Link>}</li>
              <li>{userRole === 'teacher' && <Link to="/quiz">Quiz AI</Link>}</li>             
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

      {/* Hero Section */}
      <section id="hero">
        <div className="container">
          <h1>Welcome to LearnLinguaAI</h1>
          <p>Boost your English skills with AI-driven exercises and personalized learning paths!</p>
        </div>
      </section>

      {/* Features Section */}
      <section id="features">
      <div className="container">
          <h2>Why LearnLinguaAI?</h2>
          <div className="features-list">
            <div className="feature-item">
              <div className='chu'>
                <h3>Personalized Learning</h3>
                <p>LearnLinguaAI creates a personalized learning path based on your current abilities, adjusting content and pace to fit your goals. Whether you're a beginner or advanced, the platform helps you focus on improving weaknesses and building on strengths for steady and effective progress.</p></div>
              <div className='anh000'> <img src={anh12} ></img></div>
            </div>
            <div className="feature-item">
            <div className='chu'>
              <h3>Interactive Exercises</h3>
              <p>LearnLinguaAI makes language learning engaging with interactive exercises like simulated conversations and quizzes, encouraging active participation for a more enjoyable experience. These exercises immerse you in real-life situations, reinforcing your knowledge and ensuring steady progress.</p>
            </div>
              <div className='anh000'> <img src={anh11} ></img></div>
            </div>

            <div className="feature-item">
            <div className='chu'><h3>Instant Feedback</h3>
              <p>The platform provides instant feedback, identifying mistakes and offering corrections to help you learn quickly and accurately. This real-time guidance boosts your confidence as you practice, enabling you to make improvements on the spot.</p>
              </div>
             
              <div className='anh000'> <img src={anh13} ></img></div>
            </div>
            <div className="feature-item">
              <div className='chu'><h3>Real-Time Conversation Practice</h3>
              <p>LearnLinguaAI enhances your speaking skills through real-time conversation practice. Engage in simulated dialogues in various scenarios such as ordering food or asking for directions, building your fluency and confidence for real-world use.</p></div>
              
              <div className='anh000'> <img src={anh14} ></img></div>
            </div>
            <div className="feature-item">
              <div className='chu'><h3>Progress Tracking and Insights</h3>
              <p>Tracking your progress is simple with detailed insights showing mastered words, grammar improvements, and fluency growth. These metrics celebrate your achievements and keep you motivated as you work toward your language goals.</p></div>

              <div className='anh000'><img src={anh15} ></img></div>
            </div>
          </div>
        </div>
      </section>
      {/* How it Works Section */}
      <section id="how-it-works">
          <div className="container">
            <h2>How It Works</h2>
            <div className="steps">
              <div className="step">
                <h3>1. Sign Up</h3>
                <p>Create an account to start your journey with LearnLinguaAI.</p>
                <img src={anh16} ></img>
              </div>
              <div className="step">
                <h3>2. Start Learning</h3>
                <p>Access tailored lessons, quizzes, and exercises to improve your skills.</p>
                <img src={anh17} ></img>
              </div>
              <div className="step">
                <h3>3. English dictionary</h3>
                <p>Looking up words in an English dictionary helps you find their meanings and how to use them.</p>
                <img src={anh22} ></img>
              </div>
              
            </div>
          </div>
        </section>
        {/* Testimonials Section */}
      <section id="testimonials">
        <div className="containers">
          <h2>What Our Users Say</h2>
          <div className="testimonial-slider">
            <button onClick={handlePrev} className="prev-btn">
              &#8249;
            </button>
            <div className="testimonial">     
              <div className='anhvachu'>              
                <img src={testimonials[currentIndex].img} alt={testimonials[currentIndex].name} className="testimonial-img" />
                <h4>{testimonials[currentIndex].name}</h4>
                </div>
              <p>{testimonials[currentIndex].quote}"</p>
            </div>
            <button onClick={handleNext} className="next-btn">
              &#8250;
            </button>
          </div>
        </div>
      </section>
      <ChatBubble />
      <footer>
        <div className="container">
          <p>&copy; 2024 LearnLinguaAI. All Rights Reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Home;
