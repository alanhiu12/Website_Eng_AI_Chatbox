import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import "./css/TeacherReceive.css";

function TeacherReceive() {
    const location = useLocation();
    const navigate = useNavigate();
    const [fileUrls, setFileUrls] = useState([]);
    const [className, setClassName] = useState("");
    const [announcements, setAnnouncements] = useState([]);
    
    // Fetch data on component mount
    useEffect(() => {
        const stateClassName = location.state?.className;
        const stateAnnouncements = location.state?.announcements;

        if (stateClassName) {
            setClassName(stateClassName);
        } else {
            setClassName("Tên lớp chưa được đặt");
        }

        if (stateAnnouncements) {
            setAnnouncements(stateAnnouncements);
        } else {
            setAnnouncements(["Không có thông báo nào mới. Hãy kiểm tra lại sau."]);
        }

        const fetchAnnouncements = async () => {
            try {
                const response = await axios.get('http://localhost:3500/api/announcements');
                setAnnouncements(response.data);
            } catch (error) {
                console.error('Error fetching announcements:', error);
            }
        };

        const fetchFiles = async () => {
            try {
                const response = await axios.get('http://localhost:3500/api/files');
                setFileUrls(response.data);
            } catch (error) {
                console.error('Error fetching files:', error);
            }
        };

        fetchAnnouncements();
        fetchFiles();
    }, [location.state]);

    // Handle click for detailed announcement
    const handleAnnouncementClick = (announcement) => {
        navigate('/announcement-detail', { state: { announcement } });
    };

    // Handle deletion of an announcement
    const handleDeleteAnnouncement = async (id) => {
        try {
            await axios.delete(`http://localhost:3500/api/announcements/${id}`);
            setAnnouncements(prevAnnouncements => prevAnnouncements.filter(announcement => announcement._id !== id));
        } catch (error) {
            console.error('Error deleting announcement:', error);
        }
    };

    return (
        <div className="bulletin-container">
            <h1 className="bulletin-title">📌 Classroom Bulletin Board</h1>
            {/* Thông báo chung */}
            <div className="bulletin-section">
                <h2 className="section-title">📣 General Notice</h2>
                <ul className="announcement-list">
                    {announcements.length > 0 ? (
                        announcements.map((announcement) => (
                            <li 
                                key={announcement._id} 
                                className="announcement-item" 
                                onClick={() => handleAnnouncementClick(announcement)} // Click để xem chi tiết
                            >
                                <strong>{announcement.title}</strong>
                                <button 
                                    onClick={(e) => {
                                        e.stopPropagation(); // Ngừng sự kiện bubling
                                        handleDeleteAnnouncement(announcement._id); // Xóa thông báo
                                    }} 
                                    className="delete-button-list"
                                >
                                    🗑️
                                </button>
                            </li>
                        ))
                    ) : (
                        <li className="announcement-item">
                            There are no new notifications.
                        </li>
                    )}
                </ul>
            </div>

            {/* Tài liệu học sinh */}
            <div className="bulletin-section">
                <h2 className="section-title">📂 Study Materials</h2>
                {fileUrls.length > 0 ? (
                    <ul className="material-list">
                        {fileUrls.map((file) => (
                            <li key={file._id} className="material-item">
                                <a
                                    href={`http://localhost:3500/uploads/${file.filename}`}
                                    download
                                    className="material-link"
                                >
                                    📄 {file.originalname}
                                </a>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p className="no-materials">No study materials uploaded yet.</p>
                )}
            </div>

            {/* Button back to home */}
            <div className="button-container">
                <button
                    onClick={() => navigate("/teacher")}
                    className="back-button"
                >
                    Back
                </button>
            </div>
        </div>
    );
}

export default TeacherReceive;
