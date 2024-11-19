import React, { useState } from 'react'; // Import useState from React
import { useNavigate } from 'react-router-dom'; // Import useNavigate from react-router-dom
import './styles/Signup.css';  // Assuming you have a CSS file for styling
import Header from './Header';
import Footer from './Footer';
import img3 from '../assets/pictures/chill.gif'
const Signup = () => {
  const [fullname, setFullname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [role, setRole] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
      e.preventDefault();

      // Check if passwords match
      if (password !== confirmPassword) {
          alert('Mật khẩu xác nhận không khớp!');
          return;
      }

      // Save data to localStorage
      localStorage.setItem('fullname', fullname);
      localStorage.setItem('email', email);
      localStorage.setItem('password', password);
      localStorage.setItem('role', role);

      alert('Đăng ký thành công!');
      navigate('/login');  // Redirect to login pages
  };

  return (
     
      <section id="register" className="signup-container">
        <Header />
        
          <div className='main'>
            
            <div className="signup-box">
              <h2 className="section-title">Đăng ký tài khoản</h2>
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
                  <label>
                    Role:
                  </label>
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
                          <label htmlFor="admin">
                              <input
                                  type="radio"
                                  id="admin"
                                  name="role"
                                  value="admin"
                                  onChange={(e) => setRole(e.target.value)}
                                  required
                              /> Admin
                          </label>
                      </div>
                  </div>

                  <button type="submit" className="btn-primary">Đăng ký</button>

                  <div className="extra-links">
                      <a href="/login">Đã có tài khoản? Đăng nhập</a>
                  </div>
              </form>
              
          </div>
          <div className='anh'><img src={img3}></img></div>
          </div>
          <Footer/>
      </section>
  );
};

export default Signup;
