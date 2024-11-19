import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './css/AdminDashboard.css';

const AdminDashboard = () => {
  const navigate = useNavigate();

  // Logout functionality
  const handleLogout = (event) => {
    event.preventDefault();
    localStorage.removeItem("loggedIn");
    navigate("/login"); // Redirect to login page after logout
  };

  const [users, setUsers] = useState([
    { id: 1, name: "John Doe", role: "Teacher" },
    { id: 2, name: "Jane Smith", role: "Student" },
  ]);

  const [resources, setResources] = useState([
    { id: 1, name: "Lecture Notes", type: "PDF" },
    { id: 2, name: "Assignment 1", type: "Word Document" },
  ]);

  const [classes, setClasses] = useState([
    { id: 1, name: "Math 101", teacher: "John Doe" },
    { id: 2, name: "English 101", teacher: "Jane Smith" },
  ]);

  const [newResource, setNewResource] = useState({ name: "", type: "" });
  const [newClass, setNewClass] = useState({ name: "", teacher: "" });

  const handleDeleteUser = (id) => {
    setUsers(users.filter((user) => user.id !== id));
  };

  const handleDeleteResource = (id) => {
    setResources(resources.filter((resource) => resource.id !== id));
  };

  const handleDeleteClass = (id) => {
    setClasses(classes.filter((classItem) => classItem.id !== id));
  };

  const handleAddResource = () => {
    if (newResource.name && newResource.type) {
      setResources([
        ...resources,
        { id: resources.length + 1, name: newResource.name, type: newResource.type },
      ]);
      setNewResource({ name: "", type: "" });
    }
  };

  const handleAddClass = () => {
    if (newClass.name && newClass.teacher) {
      setClasses([
        ...classes,
        { id: classes.length + 1, name: newClass.name, teacher: newClass.teacher },
      ]);
      setNewClass({ name: "", teacher: "" });
    }
  };

  const handleInputChange = (e) => {
    setNewResource({ ...newResource, [e.target.name]: e.target.value });
  };

  const handleClassInputChange = (e) => {
    setNewClass({ ...newClass, [e.target.name]: e.target.value });
  };

  return (
    <div className="admin-dashboard">
      
      <header>
        <div className="container">
          <Link to="/" className="logo">LearnLinguaAI</Link>
          <nav>
            <ul>
              <li><Link to="/home" >Home</Link></li>
              <li><Link to="/classes">Classes</Link></li>
              <li><Link to="/about">About</Link></li>
              <li><Link to="/payment">Payment</Link> </li>
              <li className="dropdown">
                <a href="#" className="dropbtn">See More</a>
                <div className="dropdown-content">
                  <Link to="/admin" className="active" >Admin</Link>
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

      {/* Content */}
      <main className="admin-content">
        <div className="admin-profile">
          <div>
            <h1>Welcome, Admin!</h1>
            <p>Manage your platform with ease.</p>
          </div>
        </div>

        {/* User Management Section */}
        <section className="admin-section">
          <h2>👤 Manage Users</h2>
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
                <tr key={user.id}>
                  <td>{user.name}</td>
                  <td>{user.role}</td>
                  <td>
                    <button className="btn-edit">Edit</button>
                    <button
                      className="btn-delete"
                      onClick={() => handleDeleteUser(user.id)}
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
                    <button className="btn-edit">Edit</button>
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
