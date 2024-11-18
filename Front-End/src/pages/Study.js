import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './css/Study.css';

const Study = () => {
  
  const [classes, setClasses] = useState([
    { id: 1, name: "Math 101", teacher: "Mr. Smith", description: "Learn Algebra and Geometry basics.", code: "MATH101" },
    { id: 2, name: "Physics", teacher: "Ms. Johnson", description: "Introduction to Newtonian Physics.", code: "PHYSICS" },
    { id: 3, name: "Chemistry", teacher: "Dr. Brown", description: "Explore chemical reactions and elements.", code: "CHEM" },
    { id: 4, name: "English Literature", teacher: "Mrs. Green", description: "Dive into classical and modern literature.", code: "LITENG" },
  ]);

  const [newClass, setNewClass] = useState({ name: "", teacher: "", description: "" });
  const [joinCode, setJoinCode] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  // Add Class Functionality
  const handleAddClass = () => {
    if (!newClass.name || !newClass.teacher || !newClass.description) {
      alert("Please fill in all fields to add a class.");
      return;
    }
    const newClassEntry = {
      ...newClass,
      id: classes.length + 1,
      code: newClass.name.replace(/\s+/g, "").toUpperCase(), // Generate a code from the class name
    };
    setClasses([...classes, newClassEntry]);
    setNewClass({ name: "", teacher: "", description: "" });
    alert(`Class "${newClassEntry.name}" added successfully!`);
  };

  // Join Class Functionality
  const handleJoinClass = () => {
    const foundClass = classes.find((classItem) => classItem.code === joinCode);

    if (foundClass) {
      alert(`Successfully joined class: ${foundClass.name}`);
      setJoinCode("");
      setErrorMessage("");
    } else {
      setErrorMessage("Invalid class code. Please try again.");
    }
  };

  const navigate = useNavigate();

  // Logout functionality
  const handleLogout = (event) => {
    event.preventDefault();
    localStorage.removeItem("loggedIn");
    navigate("/login"); // Redirect to login page after logout
  };

  return (
    <div className="study-container">
      <header>
        <div className="container">
          <Link to="/" className="logo">LearnLinguaAI</Link>
          <nav>
            <ul>
              <li><Link to="/" className="active">Home</Link></li>
              <li><Link to="/classes">Classes</Link></li>
              <li><Link to="/about">About</Link></li>
              <li><Link to="/payment">Payment</Link></li>
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

      <main className="study-main">
        <div className="study-header-actions">
          <h1>Your Classes</h1>

          {/* Add Class Section */}
          <div className="add-class-section">
            <h2>Add a New Class</h2>
            <input
              type="text"
              placeholder="Class Name"
              value={newClass.name}
              onChange={(e) => setNewClass({ ...newClass, name: e.target.value })}
            />
            <input
              type="text"
              placeholder="Teacher Name"
              value={newClass.teacher}
              onChange={(e) => setNewClass({ ...newClass, teacher: e.target.value })}
            />
            <input
              type="text"
              placeholder="Class Description"
              value={newClass.description}
              onChange={(e) => setNewClass({ ...newClass, description: e.target.value })}
            />
            <button onClick={handleAddClass}>Add Class</button>
          </div>

          {/* Join Class Section */}
          <div className="join-class-section">
            <h2>Join a Class</h2>
            <input
              type="text"
              placeholder="Enter class code"
              value={joinCode}
              onChange={(e) => setJoinCode(e.target.value)}
            />
            <button onClick={handleJoinClass}>Join Class</button>
          </div>
          {errorMessage && <p className="error-message">{errorMessage}</p>}
        </div>

        <div className="class-grid">
          {classes.map((classItem) => (
            <div className="class-card" key={classItem.id}>
              <h2>{classItem.name}</h2>
              <p><strong>Teacher:</strong> {classItem.teacher}</p>
              <p>{classItem.description}</p>
              <button className="view-class-btn">View Class</button>
            </div>
          ))}
        </div>
      </main>

      <footer className="study-footer">
        <div className="container">
          <p>&copy; 2024 LearnLinguaAI. All Rights Reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Study;
