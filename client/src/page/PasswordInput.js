import React, { useState } from 'react';
import '../components/styles/PasswordInput.css';



const PasswordInput = ({ onSuccessfulLogin }) => {
    const [password, setPassword] = useState('');
    const correctPassword = '123@';

    const handleSubmit = (e) => {
        e.preventDefault();
        if (password === correctPassword) {
            onSuccessfulLogin(); // Gọi hàm khi mật khẩu đúng
        } else {
            alert('Mật khẩu không đúng, vui lòng thử lại!');
        }
    };

    return (
        <div className="password-input-container">
            <h2>Nhập mật khẩu để truy cập</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Mật khẩu"
                    required
                />
                <button type="submit">Đăng nhập</button>
            </form>
        </div>
    );
};

export default PasswordInput;
