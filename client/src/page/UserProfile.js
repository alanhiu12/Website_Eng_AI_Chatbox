import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import ProgressDashboard from '../components/ProgressDashboard';
import './css/UserProfile.css';
import axios from 'axios';

const UserProfile = () => {
  const user = JSON.parse(localStorage.getItem('user')) || {};
  const [profileImage, setProfileImage] = useState(user.profileImage || '');
  const [selectedImage, setSelectedImage] = useState(null);
  const [uploadMessage, setUploadMessage] = useState('');

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedImage(e.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (!selectedImage) return;

    const formData = new FormData();
    formData.append('image', selectedImage);
    formData.append('email', user.email);

    try {
      const response = await axios.post('http://localhost:3500/upload-image', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.status === 200) {
        const filename = response.data.imagePath; // Đảm bảo server trả về tên tệp
        setProfileImage(filename); // Cập nhật tên tệp
        setUploadMessage('Tải ảnh thành công!');
        // Cập nhật localStorage với tên tệp mới
        localStorage.setItem('user', JSON.stringify({ ...user, profileImage: filename }));
      }
    } catch (error) {
      console.error('Lỗi tải ảnh:', error);
      setUploadMessage('Tải ảnh thất bại. Vui lòng thử lại.');
    }
  };

  return (
    <div>
      <header>
        <div className="container">
          <Link to="/" className="logo">LearnLinguaAI</Link>
          <nav>
            <ul>
              <li><Link to="/">Home</Link></li>
              <li><Link to="/study">Learn</Link></li>
              <li><Link to="/about">About</Link></li>
              <li className="dropdown">
                <Link to="#" className="dropbtn">See More</Link>
                <div className="dropdown-content">
                  <Link to="/user-profile">Profile</Link>
                  <Link to="/contact">Contact</Link>
                  <Link to="/setting">Setting</Link>
                  <Link to="#" id="logout-link">Logout</Link>
                </div>
              </li>
            </ul>
          </nav>
        </div>
      </header>

      <h1>User Profile</h1>
      <div className="profile-info">
        <img src={profileImage ? `http://localhost:3500/uploads/${profileImage}` : 'default-profile.jpg'} alt="Profile" className="profile-image" />
        <h2>{user.fullname || 'Tên người dùng'}</h2>
        <p>Joined: {user.time || 'Thời gian tham gia'}</p>
        <p>Learning Progress: {user.progress || 'Tiến độ học tập'}</p>

        <input type="file" accept="image/*" onChange={handleImageChange} />
        <button className="btn-upload" onClick={handleUpload}>Upload Image</button>
        {uploadMessage && <p>{uploadMessage}</p>}
      </div>

      <ProgressDashboard />
      <footer>
        <div className="container">
          <p>&copy; 2024 LearnLinguaAI. All Rights Reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default UserProfile;
