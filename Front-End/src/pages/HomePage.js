import React,{ useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './css/HomePage.css'; // Import your CSS file
import anh12 from "../assets/pictures/personalizedLearning.jpg";

const Home = () => {
  const navigate = useNavigate();
  const [currentIndex, setCurrentIndex] = useState(0); // Quản lý bình luận hiện tại
  const [isAnimating, setIsAnimating] = useState(false);

  const testimonials = [
    {
      quote: "LearnLinguaAI has completely transformed the way I learn languages. The AI recommendations are spot-on!",
      name: "Jane Doe",
      img: anh12,
    },
    {
      quote: "The interactive exercises are so engaging, and the feedback helps me improve quickly!",
      name: "John Smith",
      img: anh12,
    },
    {
      quote: "I love the personalized learning plans. They keep me motivated and on track!",
      name: "Emily White",
      img: anh12,
    },
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
  // Logout functionality
  const handleLogout = (event) => {
    event.preventDefault();
    localStorage.removeItem("loggedIn");
    navigate("/login"); // Redirect to login pages after logout
  };

  return (
    <div>
      <header className="header">
      <div className="container">
    <Link to="/" className="logo">LearnLinguaAI</Link>
    <nav className="homepage-nav">
      <ul>
        <li><Link to="/" className="active">Home</Link></li>
        <li><Link to="/classes">Classes</Link></li>
        <li><Link to="/chatbot">Chat</Link></li>

        <li><Link to="/user-profile">Profile</Link></li>
        <li className="dropdown">
          <a href="#" className="dropbtn">See More</a>
          <div className="dropdown-content">
            <Link to="/admin">Admin</Link>
            
            <Link to="/contact">Contact</Link>
            <Link to="/setting">Setting</Link>
            <Link to="/teacher">Teacher</Link>
            <Link to="/score">Score</Link>
            <a href="#" onClick={handleLogout}>Logout</a>
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
          <Link to="/login" className="cta-btn">Start Learning Now</Link>
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
              <p>LearnLinguaAI is designed to adapt to your unique learning style and goals. By analyzing your current abilities, the platform creates a personalized learning path tailored specifically for you. Whether you're a beginner or an advanced learner, it adjusts the content and pace to match your needs. This means you can focus on improving the areas where you struggle most while building on your strengths, ensuring steady and effective progress.</p></div>
              <div className='anh000'> <img src={anh12} ></img></div>
            </div>
            <div className="feature-item">
            <div className='chu'><h3>Interactive Exercises</h3>
              <p>Learning a language becomes exciting with LearnLinguaAI's interactive exercises. These activities are designed to immerse you in real-life scenarios, from simulated conversations to engaging quizzes and challenges. Instead of passive memorization, you actively use the language, making the process both enjoyable and practical. The hands-on approach keeps you engaged and motivated as you apply what you’ve learned in meaningful ways.</p></div>
              
              <div className='anh000'> <img src={anh12} ></img></div>
            </div>

            <div className="feature-item">
            <div className='chu'><h3>Instant Feedback</h3>
              <p>One of the standout features of LearnLinguaAI is the instant feedback it provides during your exercises. Whether you're practicing pronunciation, answering grammar questions, or building sentences, the platform immediately highlights your mistakes and offers suggestions for improvement. This real-time guidance allows you to correct errors on the spot, helping you learn faster and more accurately while boosting your confidence in using the language.</p>
              </div>
             
              <div className='anh000'> <img src={anh12} ></img></div>
            </div>
            <div className="feature-item">
              <div className='chu'><h3>Real-Time Conversation Practice</h3>
              <p>LearnLinguaAI takes your speaking skills to the next level with real-time conversation practice. You can engage in simulated dialogues with AI, allowing you to practice speaking naturally in various scenarios, such as ordering food, asking for directions, or discussing daily topics. These interactive conversations help you develop fluency and confidence while preparing you for real-world interactions.</p></div>
              
              <div className='anh000'> <img src={anh12} ></img></div>
            </div>
            <div className="feature-item">
              <div className='chu'><h3>Progress Tracking and Insights</h3>
              <p>With LearnLinguaAI, tracking your progress is effortless. The platform provides detailed insights into your learning journey, including the number of words you've mastered, your improvements in grammar, and your fluency growth. These data-driven metrics not only help you celebrate your achievements but also keep you motivated to reach your language goals.</p></div>
              
              <div className='anh000'> <img src={anh12} ></img></div>
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
                <img src={anh12} ></img>
              </div>
              <div className="step">
                <h3>2. Take a Placement Test</h3>
                <p>Our AI analyzes your current proficiency level to customize your learning experience.</p>
                <img src={anh12} ></img>
              </div>
              <div className="step">
                <h3>3. Start Learning</h3>
                <p>Access tailored lessons, quizzes, and exercises to improve your skills.</p>
                <img src={anh12} ></img>
              </div>
            </div>
          </div>
        </section>
      {/* Testimonials Section */}
      <section id="testimonials">
        <div className="container">
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

      {/* Pricing Section */}
      
      <footer>
        <div className="container">
          <p>&copy; 2024 LearnLinguaAI. All Rights Reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Home;
