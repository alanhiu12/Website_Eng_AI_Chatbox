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

    const [users, setUsers] = useState([]);
    const [resources, setResources] = useState([
        { id: 1, name: "Lecture Notes", type: "PDF" },
        { id: 2, name: "Assignment 1", type: "Word Document" },
    ]);
    const [classes, setClasses] = useState([
        { id: 1, name: "Math 101", teacher: "John Doe" },
        { id: 2, name: "English 101", teacher: "Jane Smith" },
    ]);
    const [newClass, setNewClass] = useState({ name: "", teacher: "" });

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Fetch users from backend
    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await axios.get('http://localhost:3500/users');
                setUsers(response.data);
                setLoading(false);
            } catch (error) {
                setError("Error loading users.");
                setLoading(false);
            }
        };
        fetchUsers();
    }, []);

    // Delete user
    const handleDeleteUser = async (id) => {
        try {
            await axios.delete(`http://localhost:3500/users/${id}`);
            setUsers(users.filter(user => user._id !== id));
        } catch (error) {
            console.error('Error deleting user:', error);
        }
    };

    // Edit user
    const handleEditUser = (id) => {
        alert(`Editing user with ID: ${id}`);
        // Add your edit functionality here
    };

    // Add class
    const handleAddClass = () => {
        if (!newClass.name || !newClass.teacher) {
            alert("Please enter class name and teacher.");
            return;
        }
        setClasses([...classes, { id: classes.length + 1, name: newClass.name, teacher: newClass.teacher }]);
        setNewClass({ name: "", teacher: "" });
    };

    // Delete class
    const handleDeleteClass = (id) => {
        setClasses(classes.filter(c => c.id !== id));
    };

    // Edit class
    const handleEditClass = (id) => {
        alert(`Editing class with ID: ${id}`);
        // Add your edit functionality here
    };

    const handleClassInputChange = (e) => {
        setNewClass({ ...newClass, [e.target.name]: e.target.value });
    };

    return (
        <div className="admin-dashboard">
            <header>
                <div className="container">
                    <Link to="/admin" className="logo">LearnLinguaAI</Link>
                    <nav>
                        <ul>
                            <li className="dropdown">
                                <a href="#" className="dropbtn">See More</a>
                                <div className="dropdown-content">
                                    <Link to="/user-profile">Profile</Link>
                                    <Link to="/setting">Setting</Link>
                                    <a href="#" onClick={handleLogout}>Logout</a>
                                </div>
                            </li>
                        </ul>
                    </nav>
                </div>
            </header>

            <main className="admin-content">
                <div className="admin-profile">
                    <h1>Welcome, Admin!</h1>
                    <p>Manage your platform with ease.</p>
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
                                            className="btn-edit"
                                            onClick={() => handleEditUser(user._id)}
                                        >
                                            Edit
                                        </button>
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

                {/* Classes Section */}
                <section className="admin-section">
                    <h2>🏫 Manage Classes</h2>
                    <table className="admin-table">
                        <thead>
                            <tr>
                                <th>Class Name</th>
                                <th>Teacher</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {classes.map((classItem) => (
                                <tr key={classItem.id}>
                                    <td>{classItem.name}</td>
                                    <td>{classItem.teacher}</td>
                                    <td>
                                        <button
                                            className="btn-edit"
                                            onClick={() => handleEditClass(classItem.id)}
                                        >
                                            Edit
                                        </button>
                                        <button
                                            className="btn-delete"
                                            onClick={() => handleDeleteClass(classItem.id)}
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    <div>
                        <h3>Add New Class</h3>
                        <input
                            type="text"
                            name="name"
                            value={newClass.name}
                            onChange={handleClassInputChange}
                            placeholder="Class Name"
                        />
                        <input
                            type="text"
                            name="teacher"
                            value={newClass.teacher}
                            onChange={handleClassInputChange}
                            placeholder="Teacher Name"
                        />
                        <button onClick={handleAddClass}>Add Class</button>
                    </div>
                </section>

                {/* Analytics Section */}
                <section className="admin-section">
                    <h2>📊 Analytics</h2>
                    <div className="analytics-card">
                        <h3>Total Users</h3>
                        <p>{users.length}</p>
                    </div>
                    <div className="analytics-card">
                        <h3>Active Classes</h3>
                        <p>{classes.length}</p>
                    </div>
                </section>
            </main>
        </div>
    );
};

export default AdminDashboard;
