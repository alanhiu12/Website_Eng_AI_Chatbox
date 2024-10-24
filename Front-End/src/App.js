import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './page/HomePage';
import Login from './components/Login';
import Signup from './components/Signup';
import ForgotPassword from './components/ForgotPassword';
import AboutPage from './page/AboutPage';
import UserProfile from './page/UserProfile';
import ContactUs from './components/ContactUs';
import Setting from './page/Settings';
import Study from './page/Study';
import Chatbot from './page/ChatbotPage';
import TeacherContentPage from './page/TeacherContentPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/user-profile" element={<UserProfile />} />
        <Route path="/contact" element={<ContactUs />} />
        <Route path="/setting" element={<Setting />} />
        <Route path="/study" element={<Study />} />
        <Route path="/chatbot" element={<Chatbot />} />
        <Route path="/teacher" element={<TeacherContentPage />} />
      </Routes>
    </Router>
  );
}

export default App;
