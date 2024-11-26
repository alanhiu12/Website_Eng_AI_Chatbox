import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./css/Study.css";

const Study = () => {
  const [classes, setClasses] = useState([
    { id: 1, name: "Math 101", teacher: "Mr. Smith", description: "Learn Algebra and Geometry basics.", code: "MATH101" },
    { id: 2, name: "Physics", teacher: "Ms. Johnson", description: "Introduction to Newtonian Physics.", code: "PHYSICS" },
    { id: 3, name: "Chemistry", teacher: "Dr. Brown", description: "Explore the basics of chemical reactions.", code: "CHEM101" },
    { id: 4, name: "Biology", teacher: "Dr. Green", description: "Understand the fundamentals of living organisms.", code: "BIO101" },
    { id: 5, name: "History", teacher: "Mr. Taylor", description: "Dive into world history and ancient civilizations.", code: "HIST101" },
    { id: 6, name: "Computer Science", teacher: "Ms. Davis", description: "Learn programming fundamentals and algorithms.", code: "CS101" },
    { id: 7, name: "English Literature", teacher: "Mrs. White", description: "Study classic and modern works of literature.", code: "ENG101" },
  ]);

  const [popup, setPopup] = useState(null); // "add" | "join" | null
  const [viewedClass, setViewedClass] = useState(null); // For viewing a class
  const [newClass, setNewClass] = useState({ name: "", teacher: "", description: "" });
  const [joinCode, setJoinCode] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handlePopupOpen = (type) => setPopup(type); // Show popup: "add" or "join"
  const handlePopupClose = () => {
    setPopup(null);
    setErrorMessage("");
    setNewClass({ name: "", teacher: "", description: "" });
    setJoinCode("");
    setViewedClass(null); // Close viewed class details
  };

  const handleViewClass = (classItem) => setViewedClass(classItem); // View class details
  const handleAddClass = () => { /* Add class functionality */ };
  const handleJoinClass = () => { /* Join class functionality */ };

  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("loggedIn");
    navigate("/login");
  };

  return (
    <div>
      <header className="header">
  <div className="container">
    <Link to="/" className="logo">LearnLinguaAI</Link>
    <nav className="homepage-nav">
      <ul>
        <li><Link to="/" >Home</Link></li>
        <li><Link to="/classes" className="active" >Classes</Link></li>
        <li><Link to="/chatbot">Chat</Link></li>

        <li className="dropdown">
          <a href="#" className="dropbtn">See More</a>
          <div className="dropdown-content">
            <Link to="/admin">Admin</Link>
            <Link to="/user-profile">Profile</Link>
            <Link to="/contact">Contact</Link>
            <Link to="/setting">Setting</Link>
            <Link to="/teacher">Teacher</Link>
            <a href="#" onClick={handleLogout}>Logout</a>
          </div>
        </li>
      </ul>
    </nav>
  </div>
</header>

      <main className="study-main">
        {/* Popup for Add or Join */}
        {popup && (
          <div className="popup-section">
            <div className="popup-container">
              <h2>{popup === "add" ? "Add a New Class" : "Join a Class"}</h2>
              {/* Add or Join form */}
              {popup === "add" ? (
                <>
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
                  <div className="shika"></div>
                  <button onClick={handleAddClass}>Add Class</button>
                  <button onClick={handlePopupClose}>Cancel</button>
                </>
              ) : (
                <>
                  <input
                    type="text"
                    placeholder="Enter class code"
                    value={joinCode}
                    onChange={(e) => setJoinCode(e.target.value)}
                  />
                  <div className="shika">
                    <button onClick={handleJoinClass}>Join Class</button>
                    <button onClick={handlePopupClose}>Cancel</button>
                  </div>
                  {errorMessage && <p className="error-message">{errorMessage}</p>}
                </>
              )}
              
            </div>
          </div>
        )}

        {/* Class Details Popup */}
        {viewedClass && (
          <div className="popup-section">
            <div className="popup-container">
              <h2>{viewedClass.name}</h2>
              <p><strong>Teacher:</strong> {viewedClass.teacher}</p>
              <p><strong>Description:</strong> {viewedClass.description}</p>
              <button onClick={handlePopupClose}>Close</button>
            </div>
          </div>
        )}

      

        {/* Class Grid */}
        <section className="class-grid">
          {classes.map((classItem) => (
            <div className="class-card" key={classItem.id}>
              <Link
                to={`/bulletin-board/${classItem.id}`}
                style={{ textDecoration: "none", color: "inherit" }}
              >
                <h2>{classItem.name}</h2>
                <p><strong>Teacher:</strong> {classItem.teacher}</p>
                <p>{classItem.description}</p>
              </Link>
            </div>
          ))}
        </section>
      </main>  
      <div className="shikono">
          <button onClick={() => handlePopupOpen("add")}>Add Class</button>
          <button onClick={() => handlePopupOpen("join")}>Join Class</button>
        </div>

      <footer className="study-footer">
        <p>&copy; 2024 LearnLinguaAI. All Rights Reserved.</p>
      </footer>
    </div>
  );
};

export default Study;
