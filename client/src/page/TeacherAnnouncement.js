import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import './css/TeacherAnnouncement.css';  // Import CSS

const TeacherAnnouncement = () => {
    const [title, setTitle] = useState('');  // Tiêu đề thông báo
    const [announcement, setAnnouncement] = useState('');  // Nội dung thông báo
    const [showMessage, setShowMessage] = useState(false);  // Trạng thái hiển thị thông báo
    const navigate = useNavigate();

    const handleSendAnnouncement = async () => {
        if (title.trim() === '' || announcement.trim() === '') return;

        try {
            const response = await axios.post('http://localhost:3500/api/announcements', {
                title: title,  // Gửi tiêu đề thông báo
                message: announcement,  // Gửi nội dung thông báo
            });

            // Hiển thị thông báo gửi thành công
            setShowMessage(true);

            // Sau khi gửi thành công, xóa nội dung input
            setTitle('');
            setAnnouncement('');

            // Tạo một setTimeout để ẩn thanh thông báo sau 2 giây
            setTimeout(() => {
                setShowMessage(false);  // Ẩn thông báo
            }, 2000);  // Sau 2 giây sẽ ẩn thanh thông báo

            // Dùng setTimeout để delay chuyển hướng, giúp thông báo có thời gian hiển thị
            setTimeout(() => {
                navigate("/teacher", {
                    state: {
                        newAnnouncement: response.data,  // Gửi cả tiêu đề và nội dung thông báo
                    },
                });
            }, 2000);  // Delay 2 giây để người dùng có thể thấy thông báo
        } catch (error) {
            console.error('Error sending announcement:', error);
        }
    };

    return (
        <div className="teacher-announcement">
            <h2>Teacher's Feedback</h2>

            {/* Tiêu đề thông báo */}
            <div className="announcement-input">
                <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Nhập tiêu đề thông báo..."
                />
            </div>

            {/* Nội dung thông báo */}
            <div className="announcement-input">
                <textarea
                    value={announcement}
                    onChange={(e) => setAnnouncement(e.target.value)}
                    placeholder="Nhập nội dung..."
                />
            </div>

            {/* Gửi thông báo */}
            <div className="announcement-input">
                <button onClick={handleSendAnnouncement}>Gửi Thông Báo</button>
            </div>

            {/* Thanh thông báo */}
            {showMessage && (
                <div className="announcement-message">
                    <p><strong>Thông báo đã gửi thành công!</strong></p>
                </div>
            )}
        </div>
    );
};

export default TeacherAnnouncement;
