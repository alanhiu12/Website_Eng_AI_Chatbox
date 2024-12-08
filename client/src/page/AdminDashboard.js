import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './css/AdminDashboard.css';
import axios from 'axios';

const AdminDashboard = () => {
    const navigate = useNavigate();

    // Logout functionality
    const handleLogout = (event) => {
        event.preventDefault();
        localStorage.removeItem("loggedIn");
        navigate("/login"); // Redirect to login page after logout
    };

    const [users, setUsers] = useState([]);  // Lưu trữ dữ liệu người dùng
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Fetch users from backend
    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await axios.get('http://localhost:3500/api/users');
                setUsers(response.data);
                setLoading(false);
            } catch (error) {
                setError("Lỗi khi tải dữ liệu người dùng");
                setLoading(false);
            }
        };
        fetchUsers();
    }, []);

    // Xóa người dùng từ API và cập nhật lại danh sách người dùng
    const handleDeleteUser = async (id) => {
        if (window.confirm("Bạn chắc chắn muốn xóa người dùng này?")) {
            try {
                await axios.delete(`http://localhost:3500/api/users/${id}`);
                setUsers(users.filter(user => user._id !== id)); // Cập nhật lại danh sách người dùng
            } catch (error) {
                console.error('Lỗi khi xóa người dùng', error);
                alert("Có lỗi xảy ra khi xóa người dùng.");
            }
        }
    };

    return (
        <div className="admin-dashboard">
            <header>
                <div className="container">
                    <Link to="/admin" className="logo">LearnLinguaAI</Link>
                    <nav>
                        <ul>
                            <li className="dropdown">
                                <a href="#" onClick={handleLogout}>Logout</a>
                            </li>
                        </ul>
                    </nav>
                </div>
            </header>

            <main className="admin-content">
                <div className="admin-profile">
                    <h1>Welcome, Admin!</h1>
                </div>

                {/* User Management Section */}
                <section className="admin-section">
                    <h2>👤 Manage Users</h2>
                    {loading && <p>Loading users...</p>}
                    {error && <p>{error}</p>}
                    <table className="admin-table">
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Role</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map((user) => (
                                <tr key={user._id}>
                                    <td>{user.fullname}</td>
                                    <td>{user.role}</td>
                                    <td>
                                        <button
                                            className="btn-delete"
                                            onClick={() => handleDeleteUser(user._id)}
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </section>

                {/* Analytics Section */}
                <section className="admin-section">
                    <h2>📊 Analytics</h2>
                    <div className="analytics-card">
                        <h3>Total Users</h3>
                        <p>{users.length}</p>
                    </div>
                </section>
            </main>
        </div>
    );
};

export default AdminDashboard;
