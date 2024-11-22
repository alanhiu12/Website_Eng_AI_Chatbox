import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./css/AdminDashboard.css";

const AdminDashboard = () => {
  const navigate = useNavigate();

  const [profile, setProfile] = useState({
    username: "halo47665_82077",
    name: "Trịnh Hieu",
    email: "halo47665@gmail.com",
  });

  const [users, setUsers] = useState([
    { id: 1, name: "John Doe", role: "Admin" },
    { id: 2, name: "Jane Smith", role: "Teacher" },
  ]);

  const [classes, setClasses] = useState([
    { id: 1, name: "Math 101", teacher: "Mr. Brown" },
    { id: 2, name: "Science 101", teacher: "Ms. Green" },
  ]);

  const [newClass, setNewClass] = useState({ name: "", teacher: "" });

  const [selectedMenu, setSelectedMenu] = useState("manage-users");

  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [editingProfile, setEditingProfile] = useState({ ...profile });

  const [isEditingUser, setIsEditingUser] = useState(false);
  const [editingUser, setEditingUser] = useState({ id: null, name: "", role: "" });

  const [isEditingClass, setIsEditingClass] = useState(false);
  const [editingClass, setEditingClass] = useState({ id: null, name: "", teacher: "" });

  const [isUpdatingPassword, setIsUpdatingPassword] = useState(false);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");

  const handleLogout = (event) => {
    event.preventDefault();
    localStorage.removeItem("loggedIn");
    navigate("/login");
  };

  // Handle Profile Edit
  const handleEditProfile = () => setIsEditingProfile(true);
  const handleSaveProfile = () => {
    setProfile(editingProfile);
    setIsEditingProfile(false);
  };
  const handleProfileInputChange = (e) => {
    const { name, value } = e.target;
    setEditingProfile({ ...editingProfile, [name]: value });
  };

  // Handle User Edit
  const handleEditUser = (user) => {
    setEditingUser(user);
    setIsEditingUser(true);
  };
  const handleSaveUser = () => {
    setUsers(users.map((u) => (u.id === editingUser.id ? editingUser : u)));
    setIsEditingUser(false);
  };
  const handleUserInputChange = (e) => {
    const { name, value } = e.target;
    setEditingUser({ ...editingUser, [name]: value });
  };

  // Handle Class Edit
  const handleEditClass = (classItem) => {
    setEditingClass(classItem);
    setIsEditingClass(true);
  };
  const handleSaveClass = () => {
    setClasses(classes.map((c) => (c.id === editingClass.id ? editingClass : c)));
    setIsEditingClass(false);
  };
  const handleClassInputChange = (e) => {
    const { name, value } = e.target;
    setEditingClass({ ...editingClass, [name]: value });
  };

  const handleDeleteUser = (id) => {
    setUsers(users.filter((user) => user.id !== id));
  };

  const handleDeleteClass = (id) => {
    setClasses(classes.filter((classItem) => classItem.id !== id));
  };

  const handleAddClass = () => {
    if (newClass.name && newClass.teacher) {
      setClasses([...classes, { ...newClass, id: classes.length + 1 }]);
      setNewClass({ name: "", teacher: "" }); // Clear the input fields after adding
    } else {
      alert("Please fill out both class name and teacher.");
    }
  };

  const handleUpdatePassword = () => {
    if (!currentPassword || !newPassword || !confirmNewPassword) {
      alert("Please fill out all fields.");
    } else if (newPassword !== confirmNewPassword) {
      alert("New password and confirmation do not match.");
    } else {
      // Logic to update the password, e.g., sending a request to the backend
      alert("Password updated successfully.");
      setIsUpdatingPassword(false);
    }
  };

  const renderContent = () => {
    switch (selectedMenu) {
      case "manage-users":
        return (
          <section className="admin-section">
            <h2>Manage Users</h2>
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
                    <td1>
                      <div className="cumnut">
                        <button className="btn-edit" onClick={() => handleEditUser(user)}>
                          Edit
                        </button>
                        <button className="btn-delete" onClick={() => handleDeleteUser(user.id)}>
                          Delete
                        </button>
                      </div>
                    </td1>
                  </tr>
                ))}
              </tbody>
            </table>
          </section>
        );

      case "manage-classes":
        return (
          <section className="class-section">
            <div className="add-class-form2">            
              <h2>Manage Classes</h2>
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
                    <td1>
                      <div className="cumnut">
                        <button className="btn-edit" onClick={() => handleEditClass(classItem)}>
                          Edit
                        </button>
                        <button className="btn-delete" onClick={() => handleDeleteClass(classItem.id)}>
                          Delete
                        </button>
                      </div>
                    </td1>
                  </tr>
                ))}
              </tbody>
            </table></div>

            <div className="add-class-form">
              <h3>Add New Class</h3>
              <div>
                <h4>Class Name</h4>
                <input
                  type="text"
                  name="name"
                  value={newClass.name}
                  onChange={(e) => setNewClass({ ...newClass, name: e.target.value })}
                />
                <h4>Teacher</h4>
                <input
                  type="text"
                  name="teacher"
                  value={newClass.teacher}
                  onChange={(e) => setNewClass({ ...newClass, teacher: e.target.value })}
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
            <h2>Analytics</h2>
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

      case 'admin-profile':
        return (
          <section className="profsection">
            <h2>👤 Profile</h2>
            <div className="settings-item">
              <span>Username</span>
              <span className="settings-value">{profile.username}</span>
            </div>
            <div className="settings-item">
              <span>Name</span>
              <span className="settings-value">{profile.name}</span>
            </div>
            <div className="settings-item">
              <span>Email</span>
              <span className="settings-value">{profile.email}</span>
            </div>
            <div>
              <div className="bonut">
                <div className="upn"><button className="upnn" onClick={() => setIsUpdatingPassword(true)}>Update Password</button></div>
                <div className="editn"><button className="editnn" onClick={handleEditProfile}>Edit</button></div>
                
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
        <h2>Admin Dashboard</h2>
        <ul>
        <li>
          <button 
            onClick={() => setSelectedMenu("manage-users")}
            className={selectedMenu === "manage-users" ? "active" : ""}
          >
            Manage Users
          </button>
        </li>
        <li>
          <button 
            onClick={() => setSelectedMenu("manage-classes")}
            className={selectedMenu === "manage-classes" ? "active" : ""}
          >
            Manage Classes
          </button>
        </li>
        <li>
          <button 
            onClick={() => setSelectedMenu("analytics")}
            className={selectedMenu === "analytics" ? "active" : ""}
          >
            Analytics
          </button>
        </li>
        <li>
          <button 
            onClick={() => setSelectedMenu("admin-profile")}
            className={selectedMenu === "admin-profile" ? "active" : ""}
          >
            Profile
          </button>
        </li>
        <li>
          <button onClick={handleLogout} className="logout-btn">Logout</button>
        </li>
      </ul>
       
      </div>
      <div className="main-content">
        {renderContent()}
      </div>

      {/* Profile Edit Popup */}
      {isEditingProfile && (
        <div className="popup">
          <div className="popup-content">
            <h2>Edit Profile</h2>
            <label>
              <h4>Username:</h4>
              <input
                type="text"
                name="username"
                value={editingProfile.username}
                onChange={handleProfileInputChange}
              />
            </label>
            <label>
              <h4>Name:</h4>
              <input
                type="text"
                name="name"
                value={editingProfile.name}
                onChange={handleProfileInputChange}
              />
            </label>
            <label>
              <h4>Email:</h4>
              <input
                type="email"
                name="email"
                value={editingProfile.email}
                onChange={handleProfileInputChange}
              />
            </label>
            <div className="popup-buttons">
              <div className="saveset"><button onClick={handleSaveProfile}>Save</button></div>
              <div className="cancelset"><button onClick={() => setIsEditingProfile(false)}>Cancel</button></div>
            </div>
          </div>
        </div>
      )}

      {/* Update Password Popup */}
      {isUpdatingPassword && (
        <div className="popup">
          <div className="popup-content">
            <h2>Update Password</h2>
            <label>
              <h4>Current Password:</h4>
              <input
                type="password"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
              />
            </label>
            <label>
              <h4>New Password:</h4>
              <input
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
            </label>
            <label>
              <h4>Confirm New Password:</h4>
              <input
                type="password"
                value={confirmNewPassword}
                onChange={(e) => setConfirmNewPassword(e.target.value)}
              />
            </label>
            <div className="popup-buttons">
            <div className="saveset"><button onClick={handleUpdatePassword}>Save</button></div>
            <div className="cancelset"><button onClick={() => setIsUpdatingPassword(false)}>Cancel</button></div>
            </div>
          </div>
        </div>
      )}

      {/* User Edit Popup */}
      {isEditingUser && (
        <div className="popup">
          <div className="popup-content">
            <h2>Edit User</h2>
            <label>
              <h4>Name:</h4>
              <input
                type="text"
                name="name"
                value={editingUser.name}
                onChange={handleUserInputChange}
              />
            </label>
            <label>
              <h4>Role:</h4>
              <input
                type="text"
                name="role"
                value={editingUser.role}
                onChange={handleUserInputChange}
              />
            </label>
            <div className="popup-buttons">
            <div className="saveset"><button onClick={handleSaveUser}>Save</button></div>
            <div className="cancelset"><button onClick={() => setIsEditingUser(false)}>Cancel</button></div>
            </div>
          </div>
        </div>
      )}

      {/* Class Edit Popup */}
      {isEditingClass && (
        <div className="popup">
          <div className="popup-content">
            <h2>Edit Class</h2>
            <label>
              <h4>Class Name:</h4>
              <input
                type="text"
                name="name"
                value={editingClass.name}
                onChange={handleClassInputChange}
              />
            </label>
            <label>
              <h4>Teacher:</h4>
              <input
                type="text"
                name="teacher"
                value={editingClass.teacher}
                onChange={handleClassInputChange}
              />
            </label>
            <div className="popup-buttons">
              <button onClick={handleSaveClass}>Save</button>
              <button onClick={() => setIsEditingClass(false)}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
