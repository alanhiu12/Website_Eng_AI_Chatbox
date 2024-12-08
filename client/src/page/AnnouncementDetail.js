import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './css/AnnouncementDetail.css';

function AnnouncementDetail() {
    const location = useLocation();
    const navigate = useNavigate();
    const { announcement } = location.state || {};
    
    // Giả sử vai trò người dùng lưu trong localStorage
    const userRole = localStorage.getItem("userRole"); // "student" hoặc "teacher"

    // Xử lý nút "Quay lại" dựa trên vai trò người dùng
    const handleBackButtonClick = () => {
        if (userRole === "teacher") {
            // Nếu là giáo viên, quay lại trang danh sách thông báo của giáo viên
            navigate("/teacherreceive");
        } else if (userRole === "student") {
            // Nếu là học sinh, quay lại trang bảng tin lớp học
            navigate("/noticeboard");
        } else {
            // Nếu không có vai trò, quay lại trang mặc định (ví dụ: trang chủ)
            navigate("/home");
        }
    };

    return (
        <div className="announcement-detail-container">
            <h1 className="announcement-title">Notification Details</h1>
            <div className="announcement-content">
                <h2>{announcement?.title}</h2>
                <p>{announcement?.message}</p>
            </div>

            <div className="button-container">
                <button onClick={handleBackButtonClick} className="back-button">
                    Back
                </button>
            </div>
        </div>
    );
}

export default AnnouncementDetail;
