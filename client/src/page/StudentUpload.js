import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './css/StudentUpload.css';

const StudentUpload = () => {
    const [files, setFiles] = useState([]);
    const [uploadStatus, setUploadStatus] = useState('');
    const [isUploading, setIsUploading] = useState(false);
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    // Lấy thông tin người dùng từ localStorage
    useEffect(() => {
        const userData = localStorage.getItem('user');
        if (userData) {
            const parsedUser = JSON.parse(userData);
            parsedUser.createdAtFormatted = new Date(parsedUser.createdAt).toLocaleString('vi-VN', {
                day: '2-digit',
                month: '2-digit',
                year: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit',
            });
            setUser(parsedUser);
        }
    }, []);

    // Xử lý chọn file
    const handleFileChange = (e) => {
        const selectedFiles = Array.from(e.target.files);
        const validFiles = selectedFiles.filter(file => file.size <= 10 * 1024 * 1024); // Giới hạn 10MB
        if (validFiles.length < selectedFiles.length) {
            alert('Một số file quá lớn (tối đa 10MB). Những file này không được chọn.');
        }
        setFiles(validFiles);
    };

    // Xử lý tải lên file
    const handleUploadFiles = async () => {
        if (!files || files.length === 0) {
            setUploadStatus('Hãy chọn ít nhất một file để tải lên.');
            return;
        }

        const formData = new FormData();
        files.forEach(file => formData.append('files', file));

        setIsUploading(true);
        setUploadStatus('');

        try {
            const response = await axios.post('http://localhost:3500/upload-files-student', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            if (response.status === 200) {
                const fileUrls = response.data.fileUrls;
                setUploadStatus('Tải lên thành công!');
                localStorage.setItem('uploadedFileUrls', JSON.stringify(fileUrls));
                setTimeout(() => navigate('/noticeboard'), 3000); // Chuyển hướng sau 3 giây
            } else {
                setUploadStatus('Tải lên thất bại. Vui lòng thử lại.');
            }
        } catch (error) {
            console.error('Lỗi khi tải lên file:', error);
            setUploadStatus('Đã xảy ra lỗi khi tải lên file.');
        } finally {
            setIsUploading(false);
        }
    };

    // Quay lại trang trước đó
    const handleBackButtonClick = () => {
        navigate(-1);  // Quay lại trang trước đó
    };

    return (
        <div className="student-upload-container">
            <div className="student-content-page">
                <main>
                    {/* Hiển thị thông tin người dùng */}
                    <div className="user-info">
                        <h1>Hello, {user?.fullname || 'Học Sinh'}</h1>
                        <p>Email: {user?.email || 'Không có thông tin'}</p>
                    </div>

                    {/* Khu vực tải lên file */}
                    <section className="file-upload-section">
                        <h2>Upload Documents</h2>
                        <div className="file-upload-container">
                            <label htmlFor="file-upload" className="file-upload-label">
                                Select File (Tối đa 10MB mỗi file)
                            </label>
                            <input
                                id="file-upload"
                                type="file"
                                multiple
                                onChange={handleFileChange}
                                aria-label="Chọn file để tải lên"
                            />
                            {files.length > 0 && (
                                <div className="file-previews">
                                    <h3>Selected file:</h3>
                                    <ul>
                                        {files.map((file, index) => (
                                            <li key={index}>
                                                {file.name} ({(file.size / (1024 * 1024)).toFixed(2)} MB)
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                        </div>
                    </section>

                    {/* Nút tải lên và quay lại */}
                    <div className="button-container">
                        <button
                            onClick={handleUploadFiles}
                            className="upload-button"
                            disabled={isUploading}
                        >
                            {isUploading ? 'Đang tải lên...' : 'Tải Lên'}
                        </button>
                        <button onClick={handleBackButtonClick} className="back-button">
                            Back
                        </button>
                    </div>

                    {/* Trạng thái tải lên */}
                    {uploadStatus && <p className="upload-status">{uploadStatus}</p>}
                </main>
            </div>
        </div>
    );
};

export default StudentUpload;
