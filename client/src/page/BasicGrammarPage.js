import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

function ClassroomNoticeBoard() {
    const location = useLocation();
    const navigate = useNavigate();
    const [fileUrls, setFileUrls] = useState([]);
    const [className, setClassName] = useState('');
    const [announcements, setAnnouncements] = useState([]); // Thông báo

    useEffect(() => {
        const stateFileUrls = location.state?.fileUrls;
        const storedFileUrls = JSON.parse(localStorage.getItem('uploadedFileUrls'));
        const stateClassName = location.state?.className;
        const stateAnnouncements = location.state?.announcements;

        if (stateFileUrls) {
            setFileUrls(stateFileUrls);
        } else if (storedFileUrls) {
            setFileUrls(storedFileUrls);
        }

        if (stateClassName) {
            setClassName(stateClassName);
        } else {
            setClassName('Tên lớp chưa được đặt');
        }

        if (stateAnnouncements) {
            setAnnouncements(stateAnnouncements);
        } else {
            setAnnouncements([
                'Không có thông báo nào mới. Hãy kiểm tra lại sau.',
            ]);
        }
    }, [location.state]);

    return (
        <div style={{ margin: '20px' }}>
            <h1 style={{ textAlign: 'center', marginBottom: '20px' }}>
                Bảng Tin Lớp Học: {className}
            </h1>
            {/* Khu vực tài liệu */}
            <div style={{ marginBottom: '30px', padding: '20px', border: '1px solid #ddd', borderRadius: '8px', backgroundColor: '#f9f9f9' }}>
                <h2 style={{ borderBottom: '2px solid #28A745', paddingBottom: '10px', marginBottom: '15px', color: '#28A745' }}>
                    📂 Tài Liệu Học Tập
                </h2>
                {fileUrls.length > 0 ? (
                    fileUrls.map((fileUrl, index) => (
                        <div key={index} style={{ marginBottom: '10px' }}>
                            <a
                                href={`http://localhost:3500/uploads/${fileUrl}`}
                                download
                                style={{
                                    textDecoration: 'none',
                                    color: '#007BFF',
                                    fontWeight: 'bold',
                                }}
                            >
                                📄 Tải về: {fileUrl.split('/').pop()}
                            </a>
                        </div>
                    ))
                ) : (
                    <p>Không có tài liệu nào được tải lên.</p>
                )}
            </div>

            {/* Nút trở về */}
            <div style={{ textAlign: 'center' }}>
                <button
                    onClick={() => navigate('/classes')}
                    style={{
                        padding: '10px 20px',
                        backgroundColor: '#FF5733',
                        color: 'white',
                        border: 'none',
                        borderRadius: '5px',
                        cursor: 'pointer',
                    }}
                >
                    Quay lại Trang Chủ
                </button>
            </div>
        </div>
    );
}

export default ClassroomNoticeBoard;
