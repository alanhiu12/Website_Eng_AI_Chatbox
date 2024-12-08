import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./css/ClassroomNoticeBoard.css";

function ClassroomNoticeBoard() {
  const navigate = useNavigate();
  const [fileUrls, setFileUrls] = useState([]);
  const [announcements, setAnnouncements] = useState([]);

  useEffect(() => {
    const fetchAnnouncements = async () => {
      try {
        const response = await axios.get("http://localhost:3500/api/announcements");
        setAnnouncements(response.data);
      } catch (error) {
        console.error("Error fetching announcements:", error);
      }
    };

    const fetchFiles = async () => {
      try {
        const response = await axios.get("http://localhost:3500/api/files");
        setFileUrls(response.data);
      } catch (error) {
        console.error("Error fetching files:", error);
      }
    };

    fetchAnnouncements();
    fetchFiles();
  }, []);

  const handleDeleteFile = async (fileId) => {
    try {
      await axios.delete(`http://localhost:3500/delete-file-student/${fileId}`);
      setFileUrls((prevFileUrls) => prevFileUrls.filter((file) => file._id !== fileId)); // Cập nhật lại danh sách file
    } catch (error) {
      console.error("Error deleting file:", error);
    }
  };

  // Hàm chuyển đến trang upload
  const handleGoToUpload = () => {
    navigate("/studentupload");
  };

  // Hàm quay lại trang trước
  const handleGoBack = () => {
    navigate("/classes"); // Dùng -1 để quay lại trang trước đó trong lịch sử
  };

  // Hàm chuyển đến trang chi tiết thông báo
  const handleGoToAnnouncementDetail = (announcement) => {
    navigate("/announcement-detail", { state: { announcement } }); // Truyền thông báo qua state
  };

  return (
    <div className="bulletin-container">
      <h1 className="bulletin-title">📌 Classroom Bulletin Board</h1>

      {/* Announcements Section */}
      <div className="bulletin-section">
        <h2 className="section-title">📣 General Notice</h2>
        <ul className="announcement-list">
          {announcements.length > 0 ? (
            announcements.map((announcement) => (
              <li key={announcement._id} className="announcement-item">
                <button 
                  className="announcement-button"
                  onClick={() => handleGoToAnnouncementDetail(announcement)} // Khi nhấn sẽ chuyển đến trang chi tiết thông báo
                >
                  <strong>{announcement.title}</strong>
                </button>
              </li>
            ))
          ) : (
            <li className="announcement-item">There are no new notifications.</li>
          )}
        </ul>
      </div>

      {/* Study Materials Section */}
      <div className="bulletin-section">
        <h2 className="section-title">📂 Study Materials</h2>
        {fileUrls.length > 0 ? (
          <ul className="material-list">
            {fileUrls.map((file) => (
              <li key={file._id} className="material-item">
                <a href={`http://localhost:3500/uploads/${file.filename}`} download className="material-link">
                  📄 {file.originalname}
                </a>
                <button
                  onClick={() => handleDeleteFile(file._id)}
                  className="delete-button-file"
                >
                  ❌ Delete
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <p className="no-materials">No study materials uploaded yet.</p>
        )}
      </div>

      {/* Nút quay lại */}
      <div className="button-container">
        <button onClick={handleGoBack} className="go-back-button">
          🔙 Back
        </button>

        {/* Nút chuyển đến trang upload */}
        <button onClick={handleGoToUpload} className="go-upload-button">
          📤 Upload Documents
        </button>
      </div>
    </div>
  );
}

export default ClassroomNoticeBoard;
