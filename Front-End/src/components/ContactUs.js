import React, { useState } from 'react';
import './styles/Contact.css'; // Assuming you have a CSS file in the 'css' folder
import { Link } from 'react-router-dom';

const ContactUs = () => {
    // State to handle form inputs
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        message: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // You can add form validation or an API call here
        console.log('Form Data Submitted:', formData);
    };

    return (
        <div>
            <header>
                <div className="container">
                    <a href="/" className="logo">LearnLinguaAI</a>
                    <nav>
                        <ul>
                            <li><a href="/">Home</a></li>
                            <li><a href="/study">Exercises</a></li>
                            <li><a href="/about">About</a></li>
                            <li className="dropdown">
                                <a href="#" className="dropbtn">More</a>
                                <div className="dropdown-content">
                                    <a href="/user-profile">Profile</a>
                                    <a href="/contact">Contact</a>
                                    <Link to="/setting">Setting</Link>
                                    <a href="#" id="logout-link">Logout</a>
                                </div>
                            </li>
                        </ul>
                    </nav>
                </div>
            </header>

            <main>
                <section id="contact">
                    <div className="container">
                        <h2 className="section-title">Liên hệ với chúng tôi</h2>
                        <form id="contactForm" onSubmit={handleSubmit}>
                            <label htmlFor="name">Họ và tên:</label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                placeholder="Nhập tên của bạn"
                                value={formData.name}
                                onChange={handleChange}
                                required
                            />
                            
                            <label htmlFor="email">Email:</label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                placeholder="Nhập email của bạn"
                                value={formData.email}
                                onChange={handleChange}
                                required
                            />
                            
                            <label htmlFor="phone">Số điện thoại:</label>
                            <input
                                type="tel"
                                id="phone"
                                name="phone"
                                placeholder="Nhập số điện thoại của bạn"
                                value={formData.phone}
                                onChange={handleChange}
                            />
                            
                            <label htmlFor="message">Tin nhắn:</label>
                            <textarea
                                id="message"
                                name="message"
                                rows="5"
                                placeholder="Nhập nội dung tin nhắn"
                                value={formData.message}
                                onChange={handleChange}
                                required
                            ></textarea>
                            
                            <button type="submit" className="btn-primary">Gửi tin nhắn</button>
                        </form>
                    </div>
                </section>
            </main>

            <footer>
                <div className="container">
                    <p>&copy; 2024 LearnLinguaAI. All Rights Reserved.</p>
                </div>
            </footer>
        </div>
    );
};

export default ContactUs;
