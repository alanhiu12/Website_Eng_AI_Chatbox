import React, { useState } from 'react'; 
import './styles/ForgotPassword.css'; // Import the CSS
import Header from './Header'; // Import the Header component
import Footer from './Footer'; // Import the Footer component

const ForgotPassword = () => {
    const [email, setEmail] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        // Logic for handling the password reset can be implemented here
        alert(`Password reset link sent to: ${email}`);
    };

    return (
        <div>
            {/* Include Header at the top */}
            <Header />

            {/* Forgot Password form section */}
            <div className="forgot-password-container">
                <div className="forgot-password-box">
                    <h2>Forgot Password</h2>
                    <form onSubmit={handleSubmit}>
                        <input 
                            type="email" 
                            placeholder="Enter your email" 
                            value={email} 
                            onChange={(e) => setEmail(e.target.value)} 
                            required 
                        />
                        <button type="submit">Reset Password</button>
                    </form>
                    <a href="/login" className="login-link">Back to Login</a>
                </div>
            </div>

            {/* Include Footer at the bottom */}
            <Footer />
        </div>
    );
};

export default ForgotPassword;
