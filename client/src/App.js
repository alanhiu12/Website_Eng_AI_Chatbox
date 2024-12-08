import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './page/HomePage';
import Login from './components/Login';
import Signup from './components/Signup';
import ForgotPassword from './components/ForgotPassword';
import AboutPage from './page/AboutPage';
import ContactUs from './components/ContactUs';
import Setting from './page/Settings';
import Classes from './page/Classes';
import Chatbot from './page/ChatbotPage';
import TeacherContentPage from './page/TeacherContentPage';
import Admin from './page/AdminDashboard';
import StudentUpload from './page/StudentUpload';
import TeacherReceive from './page/TeacherReceive';
import UpdatePassword from './page/UpdatePassword';
import TeacherAnnouncement from './page/TeacherAnnouncement';
import AnnouncementDetail from './page/AnnouncementDetail';
import ClassroomNoticeBoard from './page/ClassroomNoticeBoard';
import Dictionary from './page/Dictionary';
import Quiz from './page/QuizAi';
import ChatBubble from './components/ChatBubble';
import Help  from './page/Help';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login  />} />
        <Route path="/login" element={<Login />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/contact" element={<ContactUs />} />
        <Route path="/setting" element={<Setting />} />
        <Route path="/chatbot" element={<Chatbot />} />
        <Route path="/classes" element={<Classes />} />
        <Route path="/teacher" element={<TeacherContentPage />} />
        <Route path="/studentupload" element={<StudentUpload />} />
        <Route path="/teacherreceive" element={<TeacherReceive />} />
        <Route path="/update-password" element={<UpdatePassword />} />
        <Route path="/TeacherAnnouncement" element={<TeacherAnnouncement />} />
        <Route path="/announcement-detail" element={<AnnouncementDetail />} />
        <Route path="/noticeboard" element={<ClassroomNoticeBoard />} />
        <Route path="/dictionary" element={<Dictionary />} />
        <Route path="/quiz" element={<Quiz />} />
        <Route path="/help" element={<Help />} />
        <Route path="/chatbubble" element={<ChatBubble />} />
      </Routes>
    </Router>
  );
}

export default App;

