import React, { useState } from "react";
import "./css/AdminDashboard.css";
import { useNavigate } from 'react-router-dom';

const AdminDashboard = () => {
  const navigate = useNavigate();

  // Logout functionality
  const handleLogout = (event) => {
    event.preventDefault();
    localStorage.removeItem("loggedIn");
    navigate("/login"); // Redirect to login page after logout
  };
  const handlesetting = (event) => {
    event.preventDefault();
    localStorage.removeItem("loggedIn");
    navigate("/setting"); //setting
  };
  const [selectedMenu, setSelectedMenu] = useState("manage-users");

  // Dummy data
  const [users, setUsers] = useState([
    { id: 1, name: "John Doe", role: "Admin" },
    { id: 2, name: "Jane Smith", role: "Teacher" },
  ]);
  const [classes, setClasses] = useState([
    { id: 1, name: "Math 101", teacher: "Mr. Brown" },
    { id: 2, name: "Science 101", teacher: "Ms. Green" },
  ]);
  const [newClass, setNewClass] = useState({ name: "", teacher: "" });

  // Event handlers
  const handleDeleteUser = (id) => {
    setUsers(users.filter((user) => user.id !== id));
  };

  const handleDeleteClass = (id) => {
    setClasses(classes.filter((classItem) => classItem.id !== id));
  };

  const handleClassInputChange = (e) => {
    const { name, value } = e.target;
    setNewClass({ ...newClass, [name]: value });
  };

  const handleAddClass = () => {
    if (newClass.name && newClass.teacher) {
      setClasses([
        ...classes,
        { id: Date.now(), name: newClass.name, teacher: newClass.teacher },
      ]);
      setNewClass({ name: "", teacher: "" });
    }
  };

  // Render content dynamically
  const renderContent = () => {
    switch (selectedMenu) {
      case "manage-users":
        return (
          <section className="admin-section">
            <h2>👤 Manage Users</h2>
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Role</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user.id}>
                    <td>{user.name}</td>
                    <td>{user.role}</td>
                    <td>
                    <div className="cumnut">
                      <button className="btn-edit">Edit</button>
                      <button
                        className="btn-delete"
                        onClick={() => handleDeleteUser(user.id)}
                      >
                        Delete
                      </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </section>
        );

      case "manage-classes":
        return (
          <section className="admin-section">
            <h2>🏫 Manage Classes</h2>
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Class Name</th>
                  <th>Teacher</th>
                 
                </tr>
              </thead>
              <tbody>
                {classes.map((classItem) => (
                  <tr key={classItem.id}>
                    <td>{classItem.name}</td>
                    <td>{classItem.teacher}</td>
                      <td>
                      <div className="cumnut"><button className="btn-edit">Edit</button>
                      <button
                        className="btn-delete"
                        onClick={() => handleDeleteClass(classItem.id)}
                      >
                        Delete
                      </button> 
                      </div>
                      </td>

                    
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="add-class-form">
              <div className="ha"><h3>Add New Class</h3></div>
              <div className="addnew">
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
              </div>
              <button onClick={handleAddClass} className="btn-add">
                Add Class
              </button>
            </div>
          </section>
        );

      case "analytics":
        return (
          <section className="admin-section">
            <h2>📊 Analytics</h2>
            <div className="teo">
            <div className="analytics-card">
              <h3>Total Users</h3>
              <p>{users.length}</p>
            </div>
            <div className="analytics-card">
              <h3>Active Classes</h3>
              <p>{classes.length}</p>
            </div>
            </div>
          </section>
        );

      default:
        return <div>Please select a menu item.</div>;
    }
  };

  return (
    <div className="admin-dashboard">
      <div className="sidebar">
        <h2 className="logo">LEARNLINGUAAI</h2>
        <ul className="menu">
          <li>
            <button
              className={selectedMenu === "manage-users" ? "active" : ""}
              onClick={() => setSelectedMenu("manage-users")}
            >
              Manage Users
            </button>
          </li>
          <li>
            <button
              className={selectedMenu === "manage-classes" ? "active" : ""}
              onClick={() => setSelectedMenu("manage-classes")}
            >
              Manage Classes
            </button>
          </li>
          <li>
            <button
              className={selectedMenu === "analytics" ? "active" : ""}
              onClick={() => setSelectedMenu("analytics")}
            >
              Analytics
            </button>
          </li>
          <li className="logout-item">
            <button className="logout-button" onClick={handlesetting}>
              Setting
            </button>
          </li>
         
          <li className="logout-item">
        <button className="logout-button" onClick={handleLogout}>
          Logout
        </button>
      </li>
        </ul>
      </div>
      <div className="main-content">{renderContent()}</div>
    </div>
  );
};

export default AdminDashboard;
