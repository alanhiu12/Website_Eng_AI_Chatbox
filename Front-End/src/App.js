import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import Signup from './components/Signup';
import ForgotPassword from './components/ForgotPassword';
import ContactUs from './components/ContactUs';
import Homepages from './pages/HomePage';
import Aboutpages from './pages/AboutPage';
import UserProfile from './pages/UserProfile'; // Fix typo from 'pagess' to 'pages'
import Setting from './pages/Settings';
import Classes from './pages/Classes'
import TeacherContentPage from './pages/TeacherContentPage';
import ChatbotPage from './pages/ChatbotPage'
import Study from './pages/Study'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Homepages />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/about" element={<Aboutpages />} />
        <Route path="/user-profile" element={<UserProfile />} />
        <Route path="/contact" element={<ContactUs />} />
        <Route path="/setting" element={<Setting />} />
        <Route path="/classes" element={<Classes />} />
        <Route path="/teacher" element={<TeacherContentPage />} />
        <Route path="/chatbot" element={<ChatbotPage />} />
        <Route path="/study" element={<Study />} />
      </Routes>
    </Router>
  );
}

export default App;
