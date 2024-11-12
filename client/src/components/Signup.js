import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './styles/Signup.css';
import Header from './Header';
import Footer from './Footer';

const Signup = () => {
    const [fullname, setFullname] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [role, setRole] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            setErrorMessage('Mật khẩu xác nhận không khớp!');
            return;
        }

        try {
            const response = await axios.post('/register', {
                fullname,
                email,
                password,
                role
            });

            if (response.status === 201) {
                // Lưu thông tin người dùng vào localStorage
                localStorage.setItem('user', JSON.stringify({ fullname, email, role }));
                alert('Đăng ký thành công!');
                navigate('/login');
            }
        } catch (error) {
            console.error('Lỗi đăng ký:', error);
            setErrorMessage('Đăng ký thất bại. Vui lòng thử lại.');
        }
    };

    return (
        <section id="register" className="signup-container">
            <Header />
            <div className="signup-box">
                <h2 className="section-title">Đăng ký tài khoản</h2>
                {errorMessage && <div className="error-message">{errorMessage}</div>}
                <form onSubmit={handleSubmit} className="signup-form">
                    <div className="form-field">
                        <label htmlFor="fullname">Họ và tên:</label>
                        <input
                            type="text"
                            id="fullname"
                            value={fullname}
                            onChange={(e) => setFullname(e.target.value)}
                            placeholder="Nhập họ và tên"
                            required
                        />
                    </div>
                    <div className="form-field">
                        <label htmlFor="email">Email:</label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Nhập email của bạn"
                            required
                        />
                    </div>
                    <div className="form-field">
                        <label htmlFor="password">Mật khẩu:</label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Nhập mật khẩu của bạn"
                            required
                        />
                    </div>
                    <div className="form-field">
                        <label htmlFor="confirm-password">Xác nhận mật khẩu:</label>
                        <input
                            type="password"
                            id="confirm-password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            placeholder="Nhập lại mật khẩu"
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>Vai trò:</label>
                        <div>
                            <label htmlFor="teacher">
                                <input
                                    type="radio"
                                    id="teacher"
                                    name="role"
                                    value="teacher"
                                    onChange={(e) => setRole(e.target.value)}
                                    required
                                /> Giáo viên
                            </label>
                            <label htmlFor="student">
                                <input
                                    type="radio"
                                    id="student"
                                    name="role"
                                    value="student"
                                    onChange={(e) => setRole(e.target.value)}
                                    required
                                /> Học sinh
                            </label>
                        </div>
                    </div>
                    <button type="submit" className="btn-primary">Đăng ký</button>
                    <div className="extra-links">
                        <a href="/login">Đã có tài khoản? Đăng nhập</a>
                    </div>
                </form>
            </div>
            <Footer />
        </section>
    );
};

export default Signup;
