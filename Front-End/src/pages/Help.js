import React from 'react';
import './css/Help.css'; // Add a CSS file for styling

const Help = () => {
  return (
    <div className="help-container">
      <h1 className="help-title">Help & FAQ</h1>
      <section className="help-section">
        <h2>Getting Started</h2>
        <div className="faq-item">
          <h3>Q: What is LearnLinguaAI?</h3>
          <p>A: LearnLinguaAI is an AI-powered platform designed to help you improve your English skills through interactive exercises, personalized lessons, and real-time feedback.</p>
        </div>
        <div className="faq-item">
          <h3>Q: How do I sign up?</h3>
          <p>A: Click the "Sign Up" button on the homepage and fill out the form. Once registered, you can start your learning journey!</p>
        </div>
        <div className="faq-item">
          <h3>Q: Is it free to use?</h3>
          <p>A: We offer a free basic plan with limited features. For full access, you can subscribe to one of our paid plans.</p>
        </div>
      </section>

      <section className="help-section">
        <h2>Using the Chatbot</h2>
        <div className="faq-item">
          <h3>Q: How does the chatbot work?</h3>
          <p>A: Our chatbot uses advanced AI to answer your questions, correct grammar, suggest vocabulary, and practice conversational English with you.</p>
        </div>
        <div className="faq-item">
          <h3>Q: Can I ask the chatbot anything?</h3>
          <p>A: Yes! Feel free to ask about grammar rules, sentence corrections, or even casual conversation topics. The more you interact, the better you learn!</p>
        </div>
        <div className="faq-item">
          <h3>Q: Does the chatbot provide grammar corrections?</h3>
          <p>A: Absolutely! Just type a sentence, and the chatbot will correct any mistakes and explain why.</p>
        </div>
      </section>

      <section className="help-section">
        <h2>Learning Features</h2>
        <div className="faq-item">
          <h3>Q: What type of lessons are available?</h3>
          <p>A: We offer lessons on grammar, vocabulary, pronunciation, and conversational skills. Each lesson is tailored to your level.</p>
        </div>
        <div className="faq-item">
          <h3>Q: How do I track my progress?</h3>
          <p>A: You can view your progress in the "Profile" section. It shows your learning history, completed exercises, and areas for improvement.</p>
        </div>
        <div className="faq-item">
          <h3>Q: Can I practice speaking?</h3>
          <p>A: Yes! Use the voice interaction feature in the chatbot to practice your speaking skills and get real-time feedback.</p>
        </div>
      </section>

      <section className="help-section">
        <h2>Technical Questions</h2>
        <div className="faq-item">
          <h3>Q: What if the chatbot isn’t responding?</h3>
          <p>A: Try refreshing the page or checking your internet connection. If the issue persists, contact our support team.</p>
        </div>
        <div className="faq-item">
          <h3>Q: Can I use this on my phone?</h3>
          <p>A: Yes! Our website is mobile-friendly, so you can learn on-the-go.</p>
        </div>
        <div className="faq-item">
          <h3>Q: Is my data secure?</h3>
          <p>A: Your data is protected with the highest security measures. We value your privacy and never share your information without consent.</p>
        </div>
      </section>

      <section className="help-section">
        <h2>Still Need Help?</h2>
        <p>If you have more questions or encounter any issues, feel free to contact our support team at <a href="mailto:support@learnlinguaai.com">support@learnlinguaai.com</a>.</p>
      </section>
    </div>
  );
};

export default Help;
