import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom'; // Combine these imports
import './css/TeacherContentPage.css'; // Import CSS for styling

const TeacherContentPage = () => {
    const [files, setFiles] = useState([]);
    const [uploadStatus, setUploadStatus] = useState('');
    const [isUploading, setIsUploading] = useState(false);
    const navigate = useNavigate();

    const handleFileChange = (e) => {
        const selectedFiles = Array.from(e.target.files);
        const validFiles = selectedFiles.filter(file => file.size <= 10 * 1024 * 1024); // Limit file size to 10MB
        if (validFiles.length < selectedFiles.length) {
            alert('Some files were too large (max 10MB). They were not added.');
        }
        setFiles(validFiles); // Store valid files only
    };

    const handleUploadFiles = async () => {
        if (!files || files.length === 0) {
            setUploadStatus('Please select at least one file to upload.');
            return;
        }

        const formData = new FormData();
        files.forEach(file => formData.append('files', file));

        setIsUploading(true);
        setUploadStatus('');

        try {
            const response = await axios.post('http://localhost:3500/upload-files', formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });

            if (response.status === 200) {
                const fileUrls = response.data.fileUrls;
                setUploadStatus('Files uploaded successfully!');
                localStorage.setItem('uploadedFileUrls', JSON.stringify(fileUrls));
                setTimeout(() => navigate('/'), 3000);
            } else {
                setUploadStatus('Upload failed. Please try again.');
            }
        } catch (error) {
            console.error('Error uploading files:', error);
            setUploadStatus('An error occurred while uploading files.');
        } finally {
            setIsUploading(false);
        }
    };

    return (
        <div>
            <header>
                <div className="container">
                    <Link to="/" className="logo">LearnLinguaAI</Link>
                    <nav>
                        <ul>
                            <li><Link to="/" className="active">Home</Link></li>
                            <li><Link to="/classes">Classes</Link></li>
                            <li><Link to="/about">About</Link></li>
                            <li className="dropdown">
                                <a href="#" className="dropbtn">See More</a>
                                <div className="dropdown-content">
                                    <Link to="/user-profile">Profile</Link>
                                    <Link to="/contact">Contact</Link>
                                    <Link to="/setting">Setting</Link>
                                    {/* Conditional logic for "Teacher" */}
                                    <Link to="/teacher">Teacher</Link>
                                    <Link to="/chatbot">Chat</Link>
                                    <Link to="/login">Login</Link>
                                </div>
                            </li>
                        </ul>
                    </nav>
                </div>
            </header>
            <div className="teacher-content-page">
                {/* Main Content */}
                <main>
                    <h1>Welcome, Teacher</h1>
                    <p className="description">Easily manage and upload your teaching materials here.</p>
                    <div className="file-upload-container">
                        <label htmlFor="file-upload" className="file-upload-label">
                            Select Files (Max 10MB each)
                        </label>
                        <input
                            id="file-upload"
                            type="file"
                            multiple
                            onChange={handleFileChange}
                            aria-label="Select files to upload"
                        />
                        {files.length > 0 && (
                            <div className="file-preview">
                                <h3>Selected Files:</h3>
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
                    <button
                        onClick={handleUploadFiles}
                        className="upload-button"
                        disabled={isUploading}
                    >
                        {isUploading ? 'Uploading...' : 'Upload Files'}
                    </button>
                    {uploadStatus && <p className="upload-status">{uploadStatus}</p>}
                </main>
            </div>
        </div>
    );
};

export default TeacherContentPage;
