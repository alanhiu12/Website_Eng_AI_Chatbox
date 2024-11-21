import React, { useState } from "react";
import "./css/AdminDashboard.css";
import { useNavigate } from "react-router-dom";

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
    navigate("/setting"); // Redirect to settings page
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

  // Popup edit states
  const [isEditingUser, setIsEditingUser] = useState(false);
  const [isEditingClass, setIsEditingClass] = useState(false);
  const [editingUser, setEditingUser] = useState({ id: null, name: "", role: "" });
  const [editingClass, setEditingClass] = useState({ id: null, name: "", teacher: "" });

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

  // Handle Edit User
  const handleEditUser = (user) => {
    setEditingUser(user);
    setIsEditingUser(true);
  };

  const handleSaveEditUser = () => {
    setUsers(users.map((u) => (u.id === editingUser.id ? editingUser : u)));
    setIsEditingUser(false);
  };

  // Handle Edit Class
  const handleEditClass = (classItem) => {
    setEditingClass(classItem);
    setIsEditingClass(true);
  };

  const handleSaveEditClass = () => {
    setClasses(classes.map((c) => (c.id === editingClass.id ? editingClass : c)));
    setIsEditingClass(false);
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
                        <button className="btn-edit" onClick={() => handleEditUser(user)}>
                          Edit
                        </button>
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
                      <div className="cumnut">
                        <button className="btn-edit" onClick={() => handleEditClass(classItem)}>
                          Edit
                        </button>
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
              <div className="ha">
                <h3>Add New Class</h3>
              </div>
              
              <div className="addnew">
                <div className="h4"><h4>ClassName</h4></div>
                <input
                  type="text"
                  name="name"
                  value={newClass.name}
                  onChange={handleClassInputChange}
                  placeholder="Class Name"
                />
                <div className="h4"><h4>Teacher</h4></div>
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

      {/* Edit User Popup */}
      {isEditingUser && (
        <div className="popup">
          <div className="popup-content">
            <h3>Edit User</h3>
            <h4>Name</h4>
            <input
              type="text"
              value={editingUser.name}
              onChange={(e) => setEditingUser({ ...editingUser, name: e.target.value })}
              placeholder="Name"
            />
            <h4>Role</h4>
            <input
              type="text"
              value={editingUser.role}
              onChange={(e) => setEditingUser({ ...editingUser, role: e.target.value })}
              placeholder="Role"
            />
            <div className="popup-actions">
              <button onClick={handleSaveEditUser} className="btn-save">
                Save
              </button>
              <button onClick={() => setIsEditingUser(false)} className="btn-cancel">
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Class Popup */}
      {isEditingClass && (
        <div className="popup">
          <div className="popup-content">
            <h3>Edit Class</h3>
            <h4>Class name</h4>
            <input
              type="text"
              value={editingClass.name}
              onChange={(e) => setEditingClass({ ...editingClass, name: e.target.value })}
              placeholder="Class Name"
            />
            <h4>Teacher</h4>
            <input
              type="text"
              value={editingClass.teacher}
              onChange={(e) => setEditingClass({ ...editingClass, teacher: e.target.value })}
              placeholder="Teacher Name"
            />
            <div className="popup-actions">
              <button onClick={handleSaveEditClass} className="btn-save">
                Save
              </button>
              <button onClick={() => setIsEditingClass(false)} className="btn-cancel">
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
