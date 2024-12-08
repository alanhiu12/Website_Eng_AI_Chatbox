import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './styles/Signup.css';
import Header from './Header';
import Footer from './Footer';
import img3 from '../assets/pictures/chill.gif'

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
            setErrorMessage('Confirmation password does not match!');
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
                alert('Registration successful!');
                navigate('/login');
            }
        } catch (error) {
            console.error('Registration error:', error);
            setErrorMessage('Registration failed. Please try again.');
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
                        <label htmlFor="fullname">Full name:</label>
                        <input
                            type="text"
                            id="fullname"
                            value={fullname}
                            onChange={(e) => setFullname(e.target.value)}
                            placeholder="Enter your first and last name"
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
                            placeholder="Enter your email"
                            required
                        />
                    </div>
                    <div className="form-field">
                        <label htmlFor="password">Password:</label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Enter your password"
                            required
                        />
                    </div>
                    <div className="form-field">
                        <label htmlFor="confirm-password">Confirm Password:</label>
                        <input
                            type="password"
                            id="confirm-password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            placeholder="Re-enter password"
                            required
                        />
                    </div>
                    <label>Role:</label>
                    <div className="form-group">
                        <div>
                            <label htmlFor="teacher">
                                <input
                                    type="radio"
                                    id="teacher"
                                    name="role"
                                    value="teacher"
                                    onChange={(e) => setRole(e.target.value)}
                                    required
                                /> Teacher
                            </label>
                            <label htmlFor="student">
                                <input
                                    type="radio"
                                    id="student"
                                    name="role"
                                    value="student"
                                    onChange={(e) => setRole(e.target.value)}
                                    required
                                /> Student
                            </label>
                        </div>
                    </div>
                    <button type="submit" className="btn-primary">Register</button>
                    <div className="extra-links">
                        <a href="/login">Already have an account? Sign in</a>
                    </div>
                </form>

            </div>                
            <div className='anh'>
                 <img src={img3}></img>
                </div>
            <Footer />
        </section>
    );
};

export default Signup;
