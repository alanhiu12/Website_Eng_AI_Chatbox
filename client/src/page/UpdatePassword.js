import React, { useState, useEffect } from 'react';
import { useNavigate,Link } from 'react-router-dom';
import axios from 'axios'; // Đảm bảo bạn cài đặt axios
import './css/UpdatePassword.css';  // Import CSS cho component UpdatePassword

const UpdatePassword = () => {
    const navigate = useNavigate();
    const [userData, setUserData] = useState(null);
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    // Load user data from localStorage
    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            setUserData(JSON.parse(storedUser));
        }
    }, []);

    // Handle logout functionality
    const handleLogout = (event) => {
        event.preventDefault();
        localStorage.removeItem('loggedIn');
        localStorage.removeItem('user');
        navigate('/login'); // Redirect to login page
    };

    // Handle password update
    const handleUpdatePassword = async (event) => {
        event.preventDefault();
        setError('');
        setSuccess('');

        // Kiểm tra các trường đầu vào
        if (!currentPassword || !newPassword) {
            setError('Please fill in both fields.');
            return;
        }

        if (newPassword.length < 6) {
            setError('New password must be at least 6 characters long.');
            return;
        }

        if (currentPassword === newPassword) {
            setError('New password cannot be the same as the current password.');
            return;
        }

        // In giá trị gửi đi để kiểm tra
        console.log('User ID:', userData._id);
        console.log('Current password:', currentPassword);
        console.log('New password:', newPassword);

        // Gửi yêu cầu kiểm tra mật khẩu hiện tại và cập nhật mật khẩu mới
        try {
            const response = await axios.put('http://localhost:3500/update-password', {
                userId: userData._id, // ID người dùng
                currentPassword,
                newPassword
            });

            // Kiểm tra phản hồi từ server
            console.log('Server Response:', response.data); // In phản hồi từ server để kiểm tra

            if (response.data.message === 'Password updated successfully!') {
                setSuccess('Password updated successfully!');
                setCurrentPassword('');
                setNewPassword('');

                // Cập nhật lại dữ liệu người dùng trong localStorage
                const updatedUser = { ...userData, password: newPassword };
                localStorage.setItem('user', JSON.stringify(updatedUser));
                setUserData(updatedUser);
                
            } else {
                setError('Failed to update password. Please check your current password.');
            }
        } catch (error) {
            setError('Error updating password. Please try again later.');
            console.error('Lỗi khi cập nhật mật khẩu:', error.message);
        }

        // Tự động xóa thông báo thành công sau 2 giây
        setTimeout(() => navigate('/setting'), 2000); 
    };

    return (
        <div className="update-password-page">
            {/* Update Password Section */}
            <div className="update-password-section">
                <h2>🔐 Update Password</h2>
                <form onSubmit={handleUpdatePassword}>
                    <div className="form-field">
                        <label htmlFor="currentPassword">Current Password:</label>
                        <input
                            type="password"
                            id="currentPassword"
                            value={currentPassword}
                            onChange={(e) => setCurrentPassword(e.target.value)}
                            required
                        />
                    </div>
                    <div className="form-field">
                        <label htmlFor="newPassword">New Password:</label>
                        <input
                            type="password"
                            id="newPassword"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            required
                        />
                    </div>
                    {error && <p className="error-message">{error}</p>}
                    {success && <p className="success-message">{success}</p>}

                    {/* Container cho các nút */}
                    <div className="button-container">
                        <button type="submit" className="update-password-btn">Update Password</button>
                        <button type="button" className="back-button" onClick={() => navigate(-1)}>Back</button>
                    </div>
                </form>
            </div>

            {/* Footer */}
            <footer className="update-password-footer">
                <Link to="/contact">
                    <i className="fas fa-envelope"></i> Contact Us
                </Link>
                <Link to="/about">
                    <i className="fas fa-file-contract"></i> Terms of Service
                </Link>
                <Link to="/help">
                    <i className="fas fa-shield-alt"></i> Help
                </Link>
            </footer>
        </div>
    );
};

export default UpdatePassword;
