import React, { useState } from 'react';
import './styles/Contact.css'; // Assuming you have a CSS file in the 'styles' folder
import { Link, useNavigate } from 'react-router-dom';

const ContactUs = () => {
    // State to handle form inputs
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        message: ''
    });

    const navigate = useNavigate();

    const handleLogout = (event) => {
        event.preventDefault();
        localStorage.removeItem("loggedIn");
        navigate("/login"); // Redirect to login page after logout
    };

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
          <Link to="/" className="logo">LearnLinguaAI</Link>
          <nav>
            <ul>
              <li><Link to="/" className="active">Home</Link></li>
              <li><Link to="/classes">Classes</Link></li>
              <li><Link to="/about">About</Link></li>
              <li><Link to="/payment">Payment</Link> </li>
              <li className="dropdown">
                <a href="#" className="dropbtn">See More</a>
                <div className="dropdown-content">
                  <Link to="/admin">Admin</Link>
                  <Link to="/user-profile">Profile</Link>
                  <Link to="/contact">Contact</Link>
                  <Link to="/setting">Setting</Link>
                  <Link to="/teacher">Teacher</Link>
                  <Link to="/chatbot">Chat</Link>
                  <a href="#" onClick={handleLogout}>Logout</a>
                </div>
              </li>
            </ul>
          </nav>
        </div>
      </header>

            <main>
                <section id="contact">
                    <div className="container">
                        <h2 className="section-title">Contact Us</h2>
                        <form id="contactForm" onSubmit={handleSubmit}>
                            <label htmlFor="name">Full Name</label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                placeholder="Enter your name"
                                value={formData.name}
                                onChange={handleChange}
                                required
                            />
                            
                            <label htmlFor="email">Email:</label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                placeholder="Enter your email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                            />
                            
                            <label htmlFor="phone">Phone Number:</label>
                            <input
                                type="tel"
                                id="phone"
                                name="phone"
                                placeholder="Enter your phone number"
                                value={formData.phone}
                                onChange={handleChange}
                            />
                            
                            <label htmlFor="message">Message:</label>
                            <textarea
                                id="message"
                                name="message"
                                rows="5"
                                placeholder="Enter your message"
                                value={formData.message}
                                onChange={handleChange}
                                required
                            ></textarea>
                            
                            <button type="submit" className="btn-primary">Send Message</button>
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
